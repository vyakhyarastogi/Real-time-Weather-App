
const API_KEY = "e02e3e4c8fa6fcab62b8fbb64e880635";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;
const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherInfo = document.getElementById("weatherInfo");


searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
    else {
        showError("Please enter a city name");
    }
});

function fetchWeather(city) {

    loading.style.display = "block";
    weatherInfo.style.display = "none";
    error.textContent = "";
    fetch(`${API_URL}&q=${city}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not Found");
            }
            return response.json();
        })
        .then((data) => {
            displayWeather(data);
        })
        .catch((err) => {
            showError(err.message);
        })
        .finally(() => {
            loading.style.display = "none";
        })
}

function displayWeather(data) {
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById('temperature');
    const windSpeed = document.getElementById("windSpeed");
    const humidity = document.getElementById("humidity");
    const weatherDesc = document.getElementById("weatherDesc");
    const weatherIcon = document.getElementById("weatherIcon");
    cityName.textContent = data.name;
    temperature.textContent = `${data.main.temp}°C`;
    weatherDesc.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherInfo.style.display = "block";

}

function showError(message) {
    error.textContent = message;
    weatherInfo.style.display = "none";
}