# 🌦️ WeatherFlow - IoT Weather Monitoring System

## 🔗 Live Demo
🌍 [Live Weather Dashboard](https://pranavhendre02.github.io/Weather-Project/)

## 📌 Project Overview

WeatherFlow is a comprehensive **real-time IoT weather monitoring system** that seamlessly integrates hardware sensors with modern web technologies. Built with Arduino Uno and DHT11 sensor, this system provides continuous environmental data monitoring through a responsive, mobile-optimized dashboard.

The project demonstrates the complete IoT workflow from sensor data collection to cloud deployment, making it perfect for learning IoT development, home automation, and environmental monitoring applications.

## ✨ Key Features

### 🔧 Hardware Integration
- **Real-time sensor data** collection from DHT11 (temperature & humidity)
- **Arduino Uno** microcontroller integration
- **Serial communication** for reliable data transmission
- **Heat index calculation** for comprehensive weather analysis

### 💻 Software Capabilities  
- **Live dashboard** with 3-second real-time updates
- **Interactive charts** using Chart.js for data visualization
- **Mobile-responsive design** optimized for all devices
- **Smart alerts** with customizable thresholds
- **RESTful API** for external application integration
- **Error handling** with graceful fallbacks for sensor disconnection

### 🌐 Cloud & Deployment
- **Render cloud hosting** for global accessibility
- **Environment variable** configuration for security
- **CORS enabled** for cross-origin requests
- **Production-ready** with PM2 process management

## 🛠️ Technology Stack

### Hardware
- **Arduino Uno R3** - Microcontroller platform
- **DHT11 Sensor** - Temperature & humidity sensing
- **USB Cable** - Serial communication interface
- **Breadboard & Jumper Wires** - Circuit connections

### Software Stack
| Layer | Technology | Purpose |
|-------|------------|---------|
| **Firmware** | Arduino IDE, C++ | Sensor data collection & serial communication |
| **Backend** | Node.js, Express.js | API server & data processing |
| **Frontend** | HTML5, CSS3, JavaScript | User interface & data visualization |
| **Charts** | Chart.js | Real-time data visualization |
| **Animations** | GSAP, AOS | Smooth UI animations |
| **Deployment** | Render, GitHub Pages | Cloud hosting |
| **Icons** | Font Awesome, Icons8 | UI iconography |

## 🔄 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Arduino Uno   │    │   Local Node.js │    │  Render Cloud   │
│   + DHT11       │────│   Application   │────│    Server       │
│   (Hardware)    │    │   (Data Bridge) │    │   (API Host)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
   Serial @ 9600                HTTP POST               REST API
   Temperature                Every 3 sec               JSON Response
   Humidity Data             Sensor Readings            Live Dashboard
```

## 🚀 Quick Start Guide

### Prerequisites
- Arduino Uno with DHT11 sensor setup
- Node.js (v14 or higher)
- Git for version control

### 1️⃣ Hardware Setup
```arduino
// DHT11 Connections:
// VCC  → 3.3V or 5V
// GND  → Ground
// DATA → Digital Pin 2
```

### 2️⃣ Software Installation
```bash
# Clone the repository
git clone https://github.com/PranavHendre02/Weather-Project.git

# Navigate to project directory
cd Weather-Project

# Install dependencies
npm install

# Install Arduino libraries
# - Adafruit DHT sensor library
# - Adafruit Unified Sensor library
```

### 3️⃣ Configuration
Create a `.env` file:
```env
PORT=3000
SERIAL_PORT=/dev/ttyUSB0  # Windows: COM3, COM4, etc.
UPDATE_INTERVAL=3000      # 3 seconds
CORS_ORIGIN=*
```

### 4️⃣ Run the System
```bash
# Upload Arduino code to your board
# Then start the local server
node localapp.js

# Open browser to: http://localhost:3000
```

## 📊 Recent Improvements & Fixes

### Mobile Optimization
- **Chart sizing fixes**: Proper responsive heights for all devices
- **Overflow prevention**: Charts no longer break mobile layouts
- **Touch-friendly controls**: Optimized button sizes for mobile interaction
- **Performance optimization**: Reduced data points on mobile devices

### Data Handling Enhancements
- **NaN value handling**: Graceful error handling for invalid sensor readings
- **3-second precision timing**: Accurate timestamp display on chart X-axis
- **Skeleton loading states**: Better user experience during data loading
- **Connection status indicators**: Real-time connection monitoring

### UI/UX Improvements
- **Smooth scrolling navigation**: Enhanced user navigation experience
- **GSAP animations**: Professional animations and transitions
- **AOS scroll effects**: Animate-on-scroll for better engagement
- **Dark mode support**: System-wide dark theme compatibility

## 🌐 Deployment Guide

### Deploy on Render (Backend)
1. Fork this repository to your GitHub account
2. Create a new **Web Service** on [Render](https://render.com/)
3. Connect your GitHub repository
4. Configure build settings:
   ```bash
   Build Command: npm install
   Start Command: node server.js
   ```
5. Set environment variables:
   ```env
   PORT=8080
   NODE_ENV=production
   ```

### Deploy Frontend (GitHub Pages)
1. Enable GitHub Pages in repository settings
2. Select source branch (usually `main` or `gh-pages`)
3. Your frontend will be available at: `https://yourusername.github.io/Weather-Project/`

## 📈 API Endpoints

### GET `/api/weather`
Returns current weather data:
```json
{
  "temperature": 25.4,
  "humidity": 65.2,
  "heatIndex": 26.1,
  "timestamp": "2025-01-20T10:30:45.123Z",
  "status": "success"
}
```

### GET `/api/health`
System health check:
```json
{
  "status": "online",
  "uptime": 3600,
  "lastUpdate": "2025-01-20T10:30:45.123Z"
}
```

## 🔍 Troubleshooting

### Common Issues

**Arduino not detected:**
- Check USB connection and drivers
- Verify correct port in Arduino IDE: Tools → Port
- Update `.env` file with correct `SERIAL_PORT`

**No data on dashboard:**
- Ensure Arduino is connected and running
- Check serial monitor for data output (9600 baud)
- Verify local Node.js server is running

**Charts not displaying properly:**
- Clear browser cache and reload
- Check browser console for JavaScript errors
- Ensure Chart.js library is loaded

**Mobile layout issues:**
- Update to latest CSS with mobile fixes
- Test on different screen sizes
- Check for horizontal scrolling issues

## 🧪 Testing

### Manual Testing
```bash
# Test API endpoint
curl http://localhost:3000/api/weather

# Test serial communication
node test-serial.js

# Test frontend
npm run test-ui
```

### Hardware Testing
- Verify DHT11 sensor readings in Arduino Serial Monitor
- Test temperature accuracy with external thermometer
- Check humidity readings with calibrated hygrometer

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup
```bash
# Install development dependencies
npm install --dev

# Run with hot reload
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📚 Documentation

- [Arduino Code Documentation](./docs/arduino.md)
- [API Reference](./docs/api.md)
- [Frontend Components](./docs/frontend.md)
- [Deployment Guide](./docs/deployment.md)

## 🔒 Security Considerations

- Environment variables for sensitive configuration
- CORS policy for API access control
- Input validation for sensor data
- Rate limiting on API endpoints
- Secure HTTPS deployment

## 📊 Performance Metrics

- **Response Time**: < 100ms API response
- **Update Frequency**: 3-second real-time updates
- **Mobile Performance**: Optimized for 60fps animations
- **Data Retention**: 24-hour rolling window
- **Uptime**: 99.9% availability target

## 🛣️ Roadmap

### Upcoming Features
- [ ] Historical data storage with database integration
- [ ] Weather prediction using machine learning
- [ ] Multiple sensor support (pressure, wind, light)
- [ ] Mobile app development (React Native)
- [ ] Email/SMS alert notifications
- [ ] Data export functionality (CSV, JSON)
- [ ] Multi-location monitoring

### Long-term Goals
- [ ] Weather station network integration
- [ ] Advanced analytics dashboard
- [ ] IoT device management platform
- [ ] Commercial weather API service

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Adafruit** for excellent DHT11 library and documentation
- **Chart.js** team for powerful charting capabilities
- **Render** for reliable cloud hosting platform
- **Arduino** community for hardware inspiration
- **Node.js** ecosystem for robust backend tools

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/PranavHendre02/Weather-Project/issues)
- **LinkedIn**: [Pranav Hendre](https://www.linkedin.com/in/pranav-hendre-b07339316)
- **Email**: [Contact for collaboration](mailto:your-email@example.com)

---

**🌟 Star this repository if you found it helpful!**

*Built with ❤️ by [Pranav Hendre](https://github.com/PranavHendre02) - Bridging hardware and software for a smarter tomorrow.*