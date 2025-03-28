require("dotenv").config();
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const axios = require("axios"); // Used to send data to Render

const SERIAL_PORT = process.env.SERIAL_PORT || "COM3"; // Update with your Arduino port
const BAUD_RATE = parseInt(process.env.BAUD_RATE) || 9600;

// Initialize SerialPort for Arduino
const port = new SerialPort({ path: SERIAL_PORT, baudRate: BAUD_RATE });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", async (data) => {
    console.log("Received data from Arduino:", data);
    const values = data.trim().split(",");

    if (values.length === 3) {
        const sensorData = {
            temperature: parseFloat(values[0]),
            humidity: parseFloat(values[1]),
            heatIndex: parseFloat(values[2]),
        };

        console.log("Sending data to Render:", sensorData);

        try {
            await axios.post("https://weather-project-nvzh.onrender.com/api/update", sensorData);
            console.log("✅ Data sent to Render successfully!");
        } catch (error) {
            console.error("❌ Error sending data to Render:", error.message);
        }
    }
});

port.on("error", (err) => {
    console.error("Serial Port Error:", err.message);
});
