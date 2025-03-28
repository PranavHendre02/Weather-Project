async function fetchWeatherData() {
    try {
        const response = await fetch("https://weather-project-nvzh.onrender.com/api/weather", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Weather Data Received:", data); // Debugging
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

setInterval(fetchWeatherData, 5000);
