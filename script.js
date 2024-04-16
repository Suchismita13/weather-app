const apiKey = "47b3c965c7a343fbabc105157241604";
const apiUrl = "http://api.weatherapi.com/v1/current.json";

// Function to fetch weather data for a specific city
async function fetchWeatherForCity(city) {
    try {
        const url = `${apiUrl}?key=${apiKey}&q=${city}&aqi=yes`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data for ${city}`);
        }
        
        const data = await response.json();
        
        // Update weather information in HTML
        updateWeatherInfo(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to update weather information in HTML
function updateWeatherInfo(data) {
    const cityElement = document.querySelector(".city");
    const tempElement = document.querySelector(".temp");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");
    const weatherIcon = document.querySelector(".Weather-icon");

    if (data.current) {
        cityElement.textContent = data.location.name;
        tempElement.textContent = data.current.temp_c + "°C";
        humidityElement.textContent = data.current.humidity + "%";
        windElement.textContent = data.current.wind_kph + " km/h";
        // Update weather icon
        weatherIcon.src = `http:${data.current.condition.icon}`;
    } else {
        console.error("Unable to retrieve weather data");
    }
}

// Event listener for search button click
document.querySelector("button").addEventListener("click", function() {
    const cityInput = document.querySelector("input").value;
    if (cityInput.trim() !== "") {
        fetchWeatherForCity(cityInput);
    } else {
        console.error("Please enter a valid city name");
    }
});
