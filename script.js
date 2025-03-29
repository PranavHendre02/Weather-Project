document.addEventListener("DOMContentLoaded", () => {
    let temp = document.querySelector("#temp-value");
    let hum = document.querySelector("#humidity-value");
    let heat = document.querySelector("#heat-index-value");

    const tempctx = document.getElementById('myChart1').getContext("2d");

    const tempChart = new Chart(tempctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const humctx = document.getElementById('myChart2').getContext("2d");

    const humChart = new Chart(humctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const heatctx = document.getElementById('myChart3').getContext("2d");

    const heatChart = new Chart(heatctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Heat Index',
                data: [],
                backgroundColor: "green", // Bar color
                borderColor: "darkgreen",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

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
            console.log("Weather Data Received:", data);

            const time = new Date().toLocaleTimeString();
            temp.innerHTML = data.temperature + "°C";
            hum.innerHTML = data.humidity + "%";
            heat.innerHTML = data.heatIndex;

            updateChart(tempChart, time, data.temperature);
            updateChart(humChart, time, data.humidity);
            updateChart(heatChart, time, data.heatIndex);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    function updateChart(chart, label, value) {
        // Keep only last 10 entries for a rolling effect
        if (chart.data.labels.length > 10) {
            chart.data.labels.shift(); // Remove oldest label
            chart.data.datasets[0].data.shift(); // Remove oldest data point
        }

        chart.data.labels.push(label);  // Add new label (time)
        chart.data.datasets[0].data.push(value); // Add new value

        chart.update(); // Refresh the chart
    }


    fetchWeatherData(); // Initial API call
    setInterval(fetchWeatherData, 3000);






}
)