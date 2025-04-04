# 🌦️ Weather Monitoring System 

## 📌 About the Project

This project is a real-time **Weather Monitoring System** that integrates an **Arduino Uno** with a **DHT11 temperature & humidity sensor** to collect weather data. The data is processed through **Node.js** and displayed on a responsive **frontend dashboard**. The system is built for real-time weather tracking, making it useful for IoT and home automation applications.

## 🚀 Features

- 🌡️ **Real-time temperature & humidity data** collection
- 🔗 **Arduino Uno & DHT11** sensor integration
- 📡 **Node.js backend** for handling serial port data
- 🖥️ **Frontend dashboard** to display live weather updates
- 🌐 **Responsive design** for mobile & desktop users
- 🔄 **API endpoint** to fetch weather data for external applications
- ⚙️ **Environment variables** for better configurability
- ☁️ **Render Deployment:** Server hosted on **Render** for seamless access

## 🏗️ Tech Stack

- **Hardware:** Arduino Uno, DHT11 Sensor
- **Software:**
  - Arduino IDE (with **Adafruit DHT11 Library**)
  - Node.js (**Express, SerialPort, WebSockets**)
  - Frontend (**HTML, CSS, JavaScript, Chart.js**)
  - **Render** for server hosting

## 🔧 How It Works

1. **Arduino Uno** reads temperature & humidity from **DHT11 sensor**.
2. Data is sent via **serial port** to the **Node.js server**.
3. **Node.js** processes and exposes the data via an **API endpoint**.
4. The **frontend dashboard** fetches data from the API and displays it.
5. WebSockets ensure **real-time updates** without page refresh.
6. **Render server** hosts the Node.js backend, making it accessible globally.

## 🏗️ Setting up Render Deployment

### 🔧 Deploy on Render

1. **Fork the repository** to your GitHub account.
2. **Create a new Web Service** on [Render](https://render.com/).
3. **Connect your GitHub repo** and select this project.
4. Set **Build Command:** `npm install && node localapp.js`
5. Define **Environment Variables:**
   - `PORT=8080` *(or any available port)*
   - `SERIAL_PORT=/dev/ttyUSB0` *(or the correct serial port for your Arduino)*
6. Click **Deploy** and wait for Render to build and start the server.

## 📜 Special Aspects

- 📲 **Mobile Responsive:** The UI is optimized for all screen sizes.
- 🔑 **Environment Variables:** Secure and flexible configuration.
- 🔗 **WebSocket Integration:** For seamless real-time updates.
- ⚡ **Efficient Serial Communication:** Ensures smooth data transfer from Arduino to the server.
- 📈 **Chart.js Integration:** Displays real-time weather data visually.

## 🔗 Live Demo

🌍 [Live Weather Dashboard](#) *(Replace with your actual live demo link)*

## 📥 Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/weather-monitoring.git
   ```
2. **Navigate to the project folder**
   ```sh
   cd weather-monitoring
   ```
3. **Install dependencies**
   ```sh
   npm install
   ```
4. **Run the server locally**
   ```sh
   node localapp.js
   ```

## 🌟 Contributions

Feel free to contribute by creating pull requests or reporting issues.

## 📜 License

This project is open-source and available under the MIT License.

---

✨ **Created with ❤️ by Pranav Hendre** ✨

