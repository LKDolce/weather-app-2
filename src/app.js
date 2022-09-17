function displayTemperature(response) {
  console.log(response.data);
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
}
let apiKey = "b02cfae02de3053b0adae5c03c2e38dc";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
