let apiKey = "462d1f08d569f95ec1f23ff00bbaacc6";

let now = new Date();

let day = now.getDay();
let hour = now.getHours();
let minute = now.getMinutes();

daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];

let currentDayTime = document.querySelector("#day-time");
currentDayTime.innerHTML = `${daysOfTheWeek[day]} ${hour}:${minute}`;

//forecast display
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  //let days = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
  let days = [];

  for (let i = 0; i < 7; i++) {
    let nextDate = new Date(response.data.daily[i + 1].dt * 1000);
    days[i] = nextDate.getDay();
    console.log(daysOfTheWeek[days[i]]);
  }

  days.forEach((day) => {
    forecastHTML =
      forecastHTML +
      `
<div class="col">
  <div id="next-day">${daysOfTheWeek[day]}</div>
  <div>
    <img
      src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
      alt=""
    />
  </div>
  <span class="high">34°</span> <span class="low">10°</span>
</div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//console.log(response.data.daily);
//for (let i = 1; i < 8; i++) {
// let nextDate = new Date(response.data.daily[i].dt * 1000);
//let maxTemp = response.data.daily[i].temp.max;
//let minTemp = response.data.daily[i].temp.min;
//console.log(nextDate);
//console.log(maxTemp);
//console.log(minTemp);
//console.log(next.innerHTML);
//let nextDayOfWeek = daysOfTheWeek[nextDate.getDay()];
// console.log(nextDayOfWeek);
//let day1 = document.querySelector("#next-day-1");
//console.log(next.innerHTML);
//}

//end forecast display

//forecast
function getForecast(longitude, latitude) {
  let apiKey = "462d1f08d569f95ec1f23ff00bbaacc6";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
//end forecast

//conversion
let celcius = null;

function showTemperature(response) {
  celcius = response.data.main.temp;

  let city = document.querySelector("#city-choice");
  city.innerHTML = response.data.name;

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celcius);

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let weatherIcon = document.querySelector("#weather-icon");
  let iconCode = response.data.weather[0].icon;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  let longitude = response.data.coord.lon;
  let latitude = response.data.coord.lat;

  getForecast(longitude, latitude);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = Math.round(celcius * (9 / 5) + 32);

  temperatureElement.innerHTML = fahrenheitTemperature;
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celcius);
}

let fahrenheitLink = document.querySelector("#fahrenheit-conversion");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-conversion");
celciusLink.addEventListener("click", convertToCelcius);
//end conversion

//default city
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Atlanta");

//end default city

function getCityFromSubmit(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city-choice");
  city.innerHTML = cityInput.value;

  let apiKey = "462d1f08d569f95ec1f23ff00bbaacc6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#weather-form");
form.addEventListener("submit", getCityFromSubmit);

//current location
function showPosition(position) {
  console.log(position.coords.longitude);
  console.log(position.coords.latitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "462d1f08d569f95ec1f23ff00bbaacc6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
//current location
