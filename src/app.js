function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

  return days[day];
}

function displayForecast(response) {
  let forecastDays = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastDays.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `         <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="45px"
                />
                <div class="weather-forecast-temp">
                  <span class="wf-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}° </span>
                  <span class="wf-temp-max"> ${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "91e4be9d3f0ce62462b88df7804804ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric&lang=es`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = (document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp));
  let cityElement = (document.querySelector("#city").innerHTML =
    response.data.name);
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let humidity = (document.querySelector("#humidity").innerHTML =
    Math.round(response.data.main.humidity) + "%");
  let windSpeed = (document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + " km/h");
  let dateElement = (document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  ));
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  celciusTemp = response.data.main.temp;
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "b02cfae02de3053b0adae5c03c2e38dc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();

  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  //remove the active class link
  celciusLink.classList.remove("active");
  //Add the active class link
  fahrenheitLink.classList.add("active");
  let tempElement = (document.querySelector("#temperature").innerHTML =
    Math.round(fahrenheitTemp));
}

function displayCelciusTemp(event) {
  event.preventDefault();
  //Add & remove the active class link
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = (document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemp));
}

let celciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

search("New York");
