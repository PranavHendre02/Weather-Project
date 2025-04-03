document.addEventListener("DOMContentLoaded", () => {
    let temp = document.querySelector("#temp-value");
    let hum = document.querySelector("#humidity-value");
    let heat = document.querySelector("#heat-index-value");
    let itemp = document.querySelector("#itemp");
    let ihumi = document.querySelector("#humi");
    let iheat = document.querySelector("#heat");
    let tempMsg = "✅ Temperature is normal.";
    let humidityMsg = "✅ Humidity is normal.";
    let heatMsg = "✅ Heat index is normal.";

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
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: "white", // X-axis label color
                        font: {
                            size: 10,
                            weight: "bold"
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 30,
                    max: 40,
                    ticks: {
                        stepSize: 1,
                        color: "white", // Y-axis label color
                        font: {
                            size: 14,
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
                            size: 15,
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
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: "white", // X-axis label color
                        font: {
                            size: 10,
                            weight: "bold"
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 10,
                    max: 50,
                    ticks: {
                        stepSize: 2,
                        color: "white", // Y-axis label color
                        font: {
                            size: 14,
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
                            size: 15,
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
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: "white", // X-axis label color
                        font: {
                            size: 10,
                            weight: "bold"
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 10,
                    max: 50,
                    ticks: {
                        stepSize: 2,
                        color: "white", // Y-axis label color
                        font: {
                            size: 14,
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
                            size: 15,
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

            // Temperature Conditions
            if (data.temperature >= 32) {
                tempMsg = "⚠️ High Temperature! Turning on fan.";
            } else if (data.temperature <= 31) {
                tempMsg = "❄️ Low Temperature! Turning on heater.";
            }

            // Humidity Conditions
            if (data.humidity >= 60) {
                humidityMsg = "⚠️ High Humidity!";
            } else if (data.humidity <= 30) {
                humidityMsg = "💧 Low Humidity!";
            }

            // Heat Index Conditions
            if (data.heatIndex >= 38) {
                heatMsg = "🔥 Extreme Heat! activate Cooling system.";
            } else if(data.heatIndex <= 30 )
            {
                heatMsg = " Low Heat! activate Cooling system.";
            }

            // Updating the HTML elements
            document.getElementById("temp-instruction").innerText = tempMsg;
            document.getElementById("humidity-instruction").innerText = humidityMsg;
            document.getElementById("heat-instruction").innerText = heatMsg;

            // Updating Live Sensor Values
            itemp.textContent = data.temperature;
            ihumi.textContent = data.humidity;
            iheat.textContent = data.heatIndex;


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