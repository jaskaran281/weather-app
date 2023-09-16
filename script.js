const apiKey = '9c2d1314920b4c282cf233344f3fdb2b';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;
const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather (city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = 'block';
        document.querySelector('.weather').style.display = "none";
    } else {
        let data = await response.json();
        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.ceil(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

        if (data.weather[ 0 ].main == "Clouds") {
            weatherIcon.src = "images/icons8-clouds-96.png";
        }
        else if (data.weather[ 0 ].main == "Rain") {
            weatherIcon.src = "images/icons8-rain-96.png";
        }
        else if (data.weather[ 0 ].main == "Drizzle") {
            weatherIcon.src = "images/icons8-rain-96.png";
        }
        else if (data.weather[ 0 ].main == "Mist") {
            weatherIcon.src = "images/icons8-haze-96.png";
        }
        else if (data.weather[ 0 ].main == "Sunny") {
            weatherIcon.src = "images/icons8-sun-96.png";
        }
        document.querySelector(".error").style.display = 'none';
        document.querySelector('.weather').style.display = "block";
    }

}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
document.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        checkWeather(searchBox.value);
    }
});
