require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

let sensorData = { temperature: "--", humidity: "--", heatIndex: "--" }; // Stores latest sensor data

// Enable CORS & JSON parsing
app.use(cors({ origin: "*" }));
app.use(express.json());

// API to get latest sensor data
app.get("/api/weather", (req, res) => {
    console.log("API Request Received. Sending:", sensorData);
    res.json(sensorData);
});

// API to receive data from localApp.js
app.post("/api/update", (req, res) => {
    if (req.body.temperature && req.body.humidity && req.body.heatIndex) {
        sensorData = req.body; // Update sensor data
        console.log("✅ Sensor data updated:", sensorData);
        res.status(200).send("Data updated successfully!");
    } else {
        res.status(400).send("Invalid data format.");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`API running at https://weather-project-nvzh.onrender.com/api/weather`);
});
