const checkWeather = document.querySelector(".submit");
const cityTemp = document.querySelector(".city-temp");
const cityWeather = document.querySelector(".city-weather");
const weatherIcon = document.querySelector(".weather-icon");
const cityName = document.querySelector(".city-name");
const apikey = "5974f2d603222e482dd74531a8b52f11";
const img = document.createElement('img');
//Check city location
checkWeather.addEventListener("click", () => {
    const city = document.querySelector(".city").value;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apikey}`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            img.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            cityTemp.textContent = Math.floor(data.main.temp - 273) + "°C";
            cityWeather.textContent = data.weather[0].description;
            weatherIcon.appendChild(img);
            cityName.textContent = city;
            cityTemp.addEventListener("click", () => {
                changeTemp(data.main.temp);
            });
        })
})
//User location
const getPosition = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            let yourWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${apikey}`;
            fetch(yourWeather)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    img.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                    cityTemp.textContent = Math.floor(data.main.temp - 273) + "°C";
                    cityWeather.textContent = data.weather[0].description;
                    weatherIcon.appendChild(img);
                    cityName.textContent = data.name;
                    cityTemp.addEventListener("click", () => {
                        changeTemp(data.main.temp);
                    });
                })
        });
    } else {
        alert("Unable to get location");
    }
}
getPosition();
const changeTemp = (temp) => {
    if (cityTemp.textContent.includes("°C")) {
        cityTemp.textContent = cityTemp.textContent = Math.floor(((temp - 273) * 1.8) + 32) + "°F";
    } else {
        cityTemp.textContent = Math.floor(temp - 273) + "°C";
    }
}