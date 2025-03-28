const socket = io("https://weather-project-nvzh.onrender.com"); // Your Render URL

// Listen for live weather updates
socket.on("weatherUpdate", (data) => {
    console.log("Live Weather Data:", data);
    
    document.getElementById("temperature").textContent = `Temperature: ${data.temperature}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${data.humidity}%`;
    document.getElementById("heatIndex").textContent = `Heat Index: ${data.heatIndex}°C`;
});
