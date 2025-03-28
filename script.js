function fetchWeatherData() {
    fetch("https://weather-project-nvzh.onrender.com/api/weather") // Ensure this matches Render's API
        .then(response => response.json())
        .then(data => {
            console.log("Live Weather Data:", data);
            
            document.getElementById("temp").value = data.temperature;
            document.getElementById("humid").value = data.humidity;
            document.getElementById("heat").value = data.heatIndex;
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Fetch data every 5 seconds
setInterval(fetchWeatherData, 5000);

// Fetch data immediately on page load
fetchWeatherData();
