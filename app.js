require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;
const IS_RENDER = process.env.RENDER || "false"; // Ensure it's a string comparison

let sensorData = { temperature: "--", humidity: "--", heatIndex: "--" };

if (IS_RENDER === "false") {
    // Running locally, use SerialPort
    const { SerialPort } = require("serialport");
    const { ReadlineParser } = require("@serialport/parser-readline");

    const SERIAL_PORT = process.env.SERIAL_PORT || "COM3"; // Change COM3 to match your Arduino port
    const BAUD_RATE = process.env.BAUD_RATE ? parseInt(process.env.BAUD_RATE) : 9600;

    try {
        const port = new SerialPort({ path: SERIAL_PORT, baudRate: BAUD_RATE });
        const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

        parser.on("data", (data) => {
            console.log("Received data from Arduino:", data);
            const values = data.trim().split(",");
            if (values.length === 3) {
                sensorData = {
                    temperature: parseFloat(values[0]),
                    humidity: parseFloat(values[1]),
                    heatIndex: parseFloat(values[2]),
                };
            }
        });

        port.on("error", (err) => {
            console.error("Serial Port Error:", err.message);
        });
    } catch (error) {
        console.error("Failed to initialize SerialPort:", error.message);
    }
} else {
    console.log("Running on Render, Arduino data not available.");
}

// Enable CORS
app.use(cors({ origin: "*" }));

// API Endpoint
app.get("/", (req, res) => {
    res.send("Weather API is running!");
});

app.get("/api/weather", (req, res) => {
    console.log("API Request Received");
    res.json(sensorData);
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}/api/weather`);
});

// WebSocket Setup
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "*" }
});

setInterval(() => {
    io.emit("weatherUpdate", sensorData); // Send real sensor data every 5 sec
}, 5000);
