const express = require("express");
const { SerialPort } = require("serialport"); // Fix here
const { ReadlineParser } = require("@serialport/parser-readline"); // Fix here
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS

// Replace with your actual Arduino port (Windows: "COM3", Linux/Mac: "/dev/ttyUSB0")
const port = new SerialPort({ path: "COM3", baudRate: 9600 });

// Read data line by line
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" })); // Fix here

let sensorData = { temperature: "--", humidity: "--", heatIndex: "--" };

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

// API Endpoint to Get Sensor Data
app.get("/api/weather", (req, res) => {
    res.json(sensorData);
});

// Start the Server
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}/api/weather`);
});
