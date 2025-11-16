const apiKey = "3d88d308e7cf8cbe7336793f64f1f346";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchBtn.addEventListener('click', () => {
    const city = searchBox.value.trim();

    if (city === "") {
        alert("Place Enter Your City");
    }
    else { 
        checkWeather(city);
    }
});

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "assets/img/cloudy.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "assets/img/sun.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "assets/img/heavy-rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "assets/img/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "assets/img/mist.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "assets/img/snowy.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}


