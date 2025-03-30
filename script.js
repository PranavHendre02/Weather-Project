document.addEventListener("DOMContentLoaded", () => {
    let temp = document.querySelector("#temp-value");
    let hum = document.querySelector("#humidity-value");
    let heat = document.querySelector("#heat-index-value");

    const tempctx = document.getElementById('myChart1').getContext("2d");

    const tempChart = new Chart(tempctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature',
                data: [],
                backgroundColor: "orange",
                borderColor: "darkorange",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    ticks: {
                        color: "white", // X-axis label color
                        font: {
                            size: 16,
                            weight: "bold"
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 30,
                    max: 40,
                    ticks: {
                        stepSize: 2,
                        color: "white", // Y-axis label color
                        font: {
                            size: 16,
                            weight: "bold"
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "white", // Legend label color
                        font: {
                            size: 14,
                            weight: "bold"
                        }
                    }
                }
            }
        }
    });

    const humctx = document.getElementById('myChart2').getContext("2d");

    const humChart = new Chart(humctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Humidity',
                data: [],
                backgroundColor: "blue",
                borderColor: "darkblue",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    ticks: {
                        color: "white", // X-axis label color
                        font: {
                            size: 16,
                            weight: "bold"
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 20,
                    max: 60,
                    ticks: {
                        stepSize: 2,
                        color: "white", // Y-axis label color
                        font: {
                            size: 16,
                            weight: "bold"
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "white", // Legend label color
                        font: {
                            size: 14,
                            weight: "bold"
                        }
                    }
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
                backgroundColor: "red",
                borderColor: "darkred",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    ticks: {
                        color: "white", // X-axis label color
                        font: {
                            size: 16,
                            weight: "bold"
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 20,
                    max: 60,
                    ticks: {
                        stepSize: 2,
                        color: "white", // Y-axis label color
                        font: {
                            size: 16,
                            weight: "bold"
                        }
                    }
                }
            },
            plugins: { // Plugins should be at the same level as scales
                legend: {
                    labels: {
                        color: 'white', // Legend text color
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
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
            updateInstructions(data.temperature, data.humidity, data.heatIndex)

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

    function updateInstructions(temp, humidity, heatIndex) {
        let tempMsg = "✅ Temperature is normal.";
        let humidityMsg = "✅ Humidity is normal.";
        let heatMsg = "✅ Heat index is normal.";
    
        // Temperature Conditions
        if (temp >= 32) {
            tempMsg = "⚠️ High Temperature! Turning on fan simulation.";
        } else if (temp <= 31) {
            tempMsg = "❄️ Low Temperature! Turning on heater simulation.";
        }
    
        // Humidity Conditions
        if (humidity >= 60) {
            humidityMsg = "⚠️ High Humidity! Activating fan simulation.";
        } else if (humidity <= 30) {
            humidityMsg = "💧 Low Humidity! Activating fan simulation.";
        }
    
        // Heat Index Conditions
        if (heatIndex >= 38) {
            heatMsg = "🔥 Extreme Heat! Cooling system activated.";
        }
    
        // Updating the HTML elements
        document.getElementById("temp-instruction").innerText = tempMsg;
        document.getElementById("humidity-instruction").innerText = humidityMsg;
        document.getElementById("heat-instruction").innerText = heatMsg;
    
        // Updating Live Sensor Values
        document.getElementById("temp-value").innerText = temp;
        document.getElementById("humidity-value").innerText = humidity;
        document.getElementById("heat-value").innerText = heatIndex;
    }
    
    // // Simulating live data (Replace this with real sensor data)
    // setInterval(() => {
    //     const temp = Math.floor(Math.random() * 15) + 25; // Random temperature (25-40°C)
    //     const humidity = Math.floor(Math.random() * 50) + 30; // Random humidity (30-80%)
    //     const heatIndex = temp + 2; // Simulated heat index
    
    //     updateInstructions(temp, humidity, heatIndex);
    // }, 3000); // Updates every 3 seconds
    
}
)