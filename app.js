require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const IS_RENDER = process.env.RENDER || "false"; // Ensure it's a string comparison

let sensorData = { temperature: "--", humidity: "--", heatIndex: "--" };

if (IS_RENDER === "false") {
    // Running locally, use SerialPort
    const { SerialPort } = require("serialport");
    const { ReadlineParser } = require("@serialport/parser-readline");

    const SERIAL_PORT = process.env.SERIAL_PORT || "COM3";
    const BAUD_RATE = process.env.BAUD_RATE ? parseInt(process.env.BAUD_RATE) : 9600;

    try {
        const port = new SerialPort({ path: SERIAL_PORT, baudRate: BAUD_RATE });
        const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

        parser.on("data", (data) => {
            console.log("Received data:", data);
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
    // Running on Render, use mock data
    setInterval(() => {
        sensorData = {
            temperature: (20 + Math.random() * 15).toFixed(2), // Random temperature (20-35°C)
            humidity: (40 + Math.random() * 40).toFixed(2), // Random humidity (40-80%)
            heatIndex: (22 + Math.random() * 10).toFixed(2), // Random heat index (22-32°C)
        };
    }, 5000); // Update mock data every 5 seconds
}

// API Endpoint
app.use(cors());
app.get("/api/weather", (req, res) => {
    res.json(sensorData);
});

app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}/api/weather`);
});
