#include <DHT.h>

#define DHTPIN 2       // DHT11 sensor connected to digital pin 2
#define DHTTYPE DHT11  // Using the DHT11 sensor

DHT dht(DHTPIN, DHTTYPE);

void setup() {
    Serial.begin(9600); // Start serial communication at 9600 baud rate
    dht.begin();
}

void loop() {
    float humidity = dht.readHumidity(); // Read humidity
    float temperature = dht.readTemperature(); // Read temperature in Celsius
    float heatIndex = dht.computeHeatIndex(temperature, humidity, false); // Compute heat index in Celsius

    if (isnan(humidity) || isnan(temperature)) {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }

    // Send data as a formatted string
    Serial.print(temperature);
    Serial.print(",");
    Serial.print(humidity);
    Serial.print(",");
    Serial.println(heatIndex); // New line after each set of readings

    delay(2000); // Send data every 2 seconds
}
