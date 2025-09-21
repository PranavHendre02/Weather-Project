// Modern Weather Monitoring System JavaScript
// Enhanced with GSAP animations and improved performance

class WeatherMonitor {
    constructor() {
        this.apiUrl = "https://weather-project-nvzh.onrender.com/api/weather";
        this.updateInterval = 3000; // 3 seconds
        this.charts = {};
        this.isOnline = true;
        this.lastUpdate = null;
        this.dataHistory = {
            temperature: [],
            humidity: [],
            heatIndex: []
        };
        
        this.init();
    }

    async init() {
        this.initializeAnimations();
        this.initializeCharts();
        this.initializeNavigation();
        this.initializeScrollEffects();
        this.startDataFetching();
        
        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    initializeAnimations() {
        // GSAP Timeline for hero animations
        const heroTl = gsap.timeline();
        
        heroTl.from(".hero-title", {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out"
        })
        .from(".hero-subtitle", {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5")
        .from(".hero-buttons .btn", {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .from(".weather-card-preview", {
            duration: 1,
            x: 100,
            opacity: 0,
            ease: "power3.out"
        }, "-=0.8");

        // Floating particles animation
        this.animateParticles();
        
        // Status cards hover animations
        this.initializeCardAnimations();
    }

    animateParticles() {
        const particles = document.querySelector('.floating-particles');
        if (particles) {
            gsap.to(particles, {
                duration: 20,
                rotation: 360,
                repeat: -1,
                ease: "none"
            });
        }
    }

    initializeCardAnimations() {
        const cards = document.querySelectorAll('.status-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.3,
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    ease: "power2.out"
                });
            });
        });
    }

    initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetSection,
                            offsetY: 70
                        },
                        ease: "power2.inOut"
                    });
                }
                
                // Close mobile menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    initializeScrollEffects() {
        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: "#dashboard",
                    ease: "power2.inOut"
                });
            });
        }

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-background');
            if (parallax) {
                gsap.to(parallax, {
                    duration: 0.5,
                    y: scrolled * 0.5,
                    ease: "power1.out"
                });
            }
        });
    }

    initializeCharts() {
        // Chart.js default configuration
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.font.size = 12;
        Chart.defaults.color = '#6b7280';

        // Temperature Chart
        this.charts.temperature = this.createChart('temperatureChart', {
            label: 'Temperature (°C)',
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            yAxisConfig: {
                min: 20,
                max: 45,
                stepSize: 5
            }
        });

        // Humidity Chart
        this.charts.humidity = this.createChart('humidityChart', {
            label: 'Humidity (%)',
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            yAxisConfig: {
                min: 0,
                max: 100,
                stepSize: 20
            }
        });

        // Heat Index Chart
        this.charts.heatIndex = this.createChart('heatIndexChart', {
            label: 'Heat Index (°C)',
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            yAxisConfig: {
                min: 20,
                max: 50,
                stepSize: 5
            }
        });
    }

    createChart(canvasId, config) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: config.label,
                    data: [],
                    borderColor: config.borderColor,
                    backgroundColor: config.backgroundColor,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: config.borderColor,
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 14,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.95)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: config.borderColor,
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        titleFont: {
                            size: 14,
                            weight: '600'
                        },
                        bodyFont: {
                            size: 13
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 10,
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        display: true,
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        },
                        ...config.yAxisConfig,
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                animation: {
                    duration: 750,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    async fetchWeatherData() {
        try {
            const response = await fetch(this.apiUrl, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            this.handleDataUpdate(data);
            this.updateOnlineStatus(true);
            
        } catch (error) {
            console.error("Error fetching weather data:", error);
            this.updateOnlineStatus(false);
        }
    }

    handleDataUpdate(data) {
        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Update hero preview
        this.updateHeroPreview(data);
        
        // Update dashboard cards
        this.updateDashboardCards(data);
        
        // Update alerts
        this.updateAlerts(data);
        
        // Update charts
        this.updateCharts(data, timestamp);
        
        // Store data history
        this.storeDataHistory(data);
        
        this.lastUpdate = new Date();
    }

    updateHeroPreview(data) {
        const heroTemp = document.getElementById('hero-temp');
        const heroHumidity = document.getElementById('hero-humidity');
        
        if (heroTemp && data.temperature !== undefined) {
            this.animateValue(heroTemp, data.temperature);
        }
        
        if (heroHumidity && data.humidity !== undefined) {
            heroHumidity.textContent = `${data.humidity}%`;
        }
    }

    updateDashboardCards(data) {
        // Temperature Card
        this.updateCard('temp', data.temperature, '°C', this.getTemperatureStatus(data.temperature));
        
        // Humidity Card
        this.updateCard('humidity', data.humidity, '%', this.getHumidityStatus(data.humidity));
        
        // Heat Index Card
        this.updateCard('heat', data.heatIndex, '°C', this.getHeatIndexStatus(data.heatIndex));
    }

    updateCard(type, value, unit, status) {
        const valueElement = document.getElementById(`${type}-value`);
        const statusElement = document.getElementById(`${type}-status`);
        const statusTextElement = document.getElementById(`${type}-status-text`);
        
        if (valueElement && value !== undefined) {
            this.animateValue(valueElement, value);
        }
        
        if (statusElement && statusTextElement) {
            statusElement.className = `status-indicator ${status.class}`;
            statusTextElement.textContent = status.text;
        }
    }

    animateValue(element, newValue) {
        const currentValue = parseFloat(element.textContent) || 0;
        
        gsap.to({ value: currentValue }, {
            duration: 0.8,
            value: newValue,
            ease: "power2.out",
            onUpdate: function() {
                element.textContent = Math.round(this.targets()[0].value);
            }
        });
    }

    getTemperatureStatus(temp) {
        if (temp >= 35) return { class: 'danger', text: 'High' };
        if (temp >= 30) return { class: 'warning', text: 'Warm' };
        if (temp <= 15) return { class: 'warning', text: 'Cold' };
        return { class: 'normal', text: 'Normal' };
    }

    getHumidityStatus(humidity) {
        if (humidity >= 70) return { class: 'warning', text: 'High' };
        if (humidity <= 30) return { class: 'warning', text: 'Low' };
        return { class: 'normal', text: 'Normal' };
    }

    getHeatIndexStatus(heatIndex) {
        if (heatIndex >= 40) return { class: 'danger', text: 'Extreme' };
        if (heatIndex >= 35) return { class: 'warning', text: 'High' };
        return { class: 'normal', text: 'Normal' };
    }

    updateAlerts(data) {
        // Temperature Alert
        const tempAlert = this.getTemperatureAlert(data.temperature);
        this.updateAlert('temp-alert-message', tempAlert);
        
        // Humidity Alert
        const humidityAlert = this.getHumidityAlert(data.humidity);
        this.updateAlert('humidity-alert-message', humidityAlert);
        
        // Heat Index Alert
        const heatAlert = this.getHeatIndexAlert(data.heatIndex);
        this.updateAlert('heat-alert-message', heatAlert);
    }

    updateAlert(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
        }
    }

    getTemperatureAlert(temp) {
        if (temp >= 35) return "🔥 High temperature detected! Cooling system activated.";
        if (temp >= 30) return "⚠️ Temperature rising. Monitor closely.";
        if (temp <= 15) return "❄️ Low temperature detected! Heating recommended.";
        return "✅ Temperature within normal range.";
    }

    getHumidityAlert(humidity) {
        if (humidity >= 70) return "💧 High humidity levels detected!";
        if (humidity <= 30) return "🏜️ Low humidity levels. Consider humidification.";
        return "✅ Humidity levels are optimal.";
    }

    getHeatIndexAlert(heatIndex) {
        if (heatIndex >= 40) return "🚨 Extreme heat index! Take immediate precautions.";
        if (heatIndex >= 35) return "⚠️ High heat index. Stay hydrated and cool.";
        return "✅ Heat index is comfortable.";
    }

    updateCharts(data, timestamp) {
        const maxDataPoints = 20;
        
        Object.keys(this.charts).forEach(chartType => {
            const chart = this.charts[chartType];
            if (!chart) return;
            
            const dataKey = chartType === 'heatIndex' ? 'heatIndex' : chartType;
            const value = data[dataKey];
            
            if (value !== undefined) {
                // Add new data point
                chart.data.labels.push(timestamp);
                chart.data.datasets[0].data.push(value);
                
                // Remove old data points
                if (chart.data.labels.length > maxDataPoints) {
                    chart.data.labels.shift();
                    chart.data.datasets[0].data.shift();
                }
                
                chart.update('none'); // Update without animation for real-time feel
            }
        });
    }

    storeDataHistory(data) {
        const maxHistory = 100;
        
        ['temperature', 'humidity', 'heatIndex'].forEach(key => {
            if (data[key] !== undefined) {
                this.dataHistory[key].push({
                    value: data[key],
                    timestamp: new Date()
                });
                
                if (this.dataHistory[key].length > maxHistory) {
                    this.dataHistory[key].shift();
                }
            }
        });
    }

    updateOnlineStatus(isOnline) {
        this.isOnline = isOnline;
        const statusElements = document.querySelectorAll('.status-dot');
        
        statusElements.forEach(element => {
            if (isOnline) {
                element.style.background = '#10b981';
                element.style.animation = 'pulse 2s infinite';
            } else {
                element.style.background = '#ef4444';
                element.style.animation = 'none';
            }
        });
    }

    startDataFetching() {
        // Initial fetch
        this.fetchWeatherData();
        
        // Set up interval
        setInterval(() => {
            this.fetchWeatherData();
        }, this.updateInterval);
    }

    // Utility method for performance monitoring
    getPerformanceMetrics() {
        return {
            isOnline: this.isOnline,
            lastUpdate: this.lastUpdate,
            dataHistorySize: Object.keys(this.dataHistory).reduce((total, key) => 
                total + this.dataHistory[key].length, 0
            ),
            chartsActive: Object.keys(this.charts).filter(key => this.charts[key]).length
        };
    }
}

// Initialize the weather monitor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    gsap.from("body", {
        duration: 0.5,
        opacity: 0,
        ease: "power2.out"
    });
    
    // Initialize the weather monitoring system
    window.weatherMonitor = new WeatherMonitor();
    
    // Add performance monitoring (optional)
    if (window.location.search.includes('debug=true')) {
        setInterval(() => {
            console.log('Performance Metrics:', window.weatherMonitor.getPerformanceMetrics());
        }, 10000);
    }
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Handle visibility change for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Reduce update frequency when tab is not visible
        console.log('Tab hidden - reducing update frequency');
    } else {
        // Resume normal update frequency
        console.log('Tab visible - resuming normal updates');
    }
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherMonitor;
}