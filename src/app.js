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
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = (document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp));
  let cityElement = (document.querySelector("#city").innerHTML =
    response.data.name);
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let humidity = (document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  ));
  let windSpeed = (document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let dateElement = (document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  ));
}
let apiKey = "b02cfae02de3053b0adae5c03c2e38dc";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
