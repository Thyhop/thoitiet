const cities = [
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 }
];

const apiKey = "YOUR_API_KEY"; // Thay thế bằng API key của bạn

async function fetchWeatherAndTime(city) {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`);
    const weatherData = await weatherResponse.json();

    const timeResponse = await fetch(`http://worldtimeapi.org/api/timezone/${weatherData.timezone}`);
    const timeData = await timeResponse.json();

    return {
        weather: weatherData,
        time: timeData
    };
}

async function displayCities() {
    const citiesContainer = document.getElementById('cities');
    citiesContainer.innerHTML = '';

    for (const city of cities) {
        const data = await fetchWeatherAndTime(city);

        const cityElement = document.createElement('div');
        cityElement.className = 'city';
        cityElement.innerHTML = `
            <h2>${city.name}</h2>
            <p>Temperature: ${data.weather.main.temp}°C</p>
            <p>Weather: ${data.weather.weather[0].description}</p>
            <p>Time: ${data.time.datetime}</p>
        `;

        citiesContainer.appendChild(cityElement);
    }
}

displayCities();
