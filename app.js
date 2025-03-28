require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const IS_RENDER = process.env.RENDER === "true"; // Ensure it's a boolean

let sensorData = { temperature: "--", humidity: "--", heatIndex: "--" };

// Run SerialPort only if NOT on Render
if (!IS_RENDER) {
    const { SerialPort } = require("serialport");
    const { ReadlineParser } = require("@serialport/parser-readline");

    const SERIAL_PORT = process.env.SERIAL_PORT || "COM3"; // Set from .env
    const BAUD_RATE = process.env.BAUD_RATE ? parseInt(process.env.BAUD_RATE) : 9600;

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
} else {
    // Mock data for Render since Serial Port is unavailable
    setInterval(() => {
        sensorData = {
            temperature: (Math.random() * 10 + 20).toFixed(2),
            humidity: (Math.random() * 20 + 50).toFixed(2),
            heatIndex: (Math.random() * 5 + 25).toFixed(2),
        };
    }, 5000); // Update mock data every 5 seconds
}

// API Endpoint to Get Sensor Data
app.use(cors());
app.get("/api/weather", (req, res) => {
    res.json(sensorData);
});

// Start the Server
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}/api/weather`);
});
