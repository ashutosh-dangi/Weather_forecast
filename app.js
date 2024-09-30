// Replace with your OpenWeatherMap API key
const API_KEY = '9525b38bfe632b7c9ea3495eed06a4a3';
const API_URL = 'https://api.openweathermap.org/data/2.5/';

document.getElementById('search-btn').addEventListener('click', fetchWeatherData);

function fetchWeatherData() {
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    const weatherUrl = `${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found!');
                return;
            }
            displayWeatherData(data);
            fetchExtendedForecast(city);
        })
        .catch(() => alert('Error fetching weather data.'));
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2 class="text-2xl">${data.name}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
    `;
    weatherInfo.style.display = 'block';
}

function fetchExtendedForecast(city) {
    const forecastUrl = `${API_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayExtendedForecast(data);
        })
        .catch(() => alert('Error fetching extended forecast.'));
}

function displayExtendedForecast(data) {
    const extendedForecast = document.getElementById('extended-forecast');
    extendedForecast.innerHTML = '<h3 class="text-xl">5-Day Forecast</h3>';

    data.list.forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        const forecastItem = `
            <div class="p-2">
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Temp:</strong> ${item.main.temp} °C</p>
                <p><strong>Wind:</strong> ${item.wind.speed} m/s</p>
                <p><strong>Humidity:</strong> ${item.main.humidity}%</p>
                <p><strong>Condition:</strong> ${item.weather[0].description}</p>
            </div>
        `;
        extendedForecast.innerHTML += forecastItem;
    });

    extendedForecast.style.display = 'block';
}
