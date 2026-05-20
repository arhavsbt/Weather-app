const apiKey = "cc33ca0d8397a666c2f80858ec9d4733";

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherResult = document.getElementById("weatherResult");
const weatherContainer = document.getElementById("weatherContainer");

searchButton.addEventListener("click", function () {
    const city = cityInput.value;

    if (city === "") {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }
    getWeather(city);
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(function (data) {
            const cityName = data.name;
            const countryName = data.sys.country;
            const temperature = data.main.temp;
            const weather = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            weatherContainer.classList.remove("cold", "mild", "warm", "hot");
            if (temperature < 15) {
            weatherContainer.classList.add("cold");
            } else if (temperature < 25) {
            weatherContainer.classList.add("mild");
            } else if (temperature < 35) {
            weatherContainer.classList.add("warm");
            } else {
            weatherContainer.classList.add("hot");
            }

            weatherResult.innerHTML = `
            <h2>${cityName}, ${countryName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weather}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
        })
        .catch(function (error) {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
}