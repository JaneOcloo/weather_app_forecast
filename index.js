function searchacity(event) {
  event.preventDefault();
  let city = document.querySelector("#headerCity");
  let cityInput = document.querySelector("#input-a-city").value;
  city.innerHTML = cityInput;
  fetchWeather(cityInput);
}
let searchFormElement = document.querySelector("#forma");
searchFormElement.addEventListener("submit", searchacity);

function fetchWeather(city) {
  let apiKey = "eafo3c54a06d9f77ba3t96121805c98f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector(
    ".weather-app-temperature-value"
  );
  let unixTimestamp = response.data.time;
  let utcDate = new Date(unixTimestamp * 1000);

  let localTime = new Date(
    utcDate.toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  );

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[localTime.getDay()];
  let dayNumber = localTime.getDate();
  let hour = localTime.getHours().toString().padStart(2, "0");
  let minute = localTime.getMinutes().toString().padStart(2, "0");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let description = document.querySelector("#weather-condition");
  let Realtimecondition = response.data.condition.description;
  description.innerHTML = Realtimecondition;
  let weatherDescription = document.querySelector("#humidity");
  weatherDescription.innerHTML = `${response.data.temperature.humidity}%`;
  let Realtimewindspeed = document.querySelector("#wind-speed");
  Realtimewindspeed.innerHTML = `${response.data.wind.speed} km/h`;
  let time = document.querySelector("#my-date");
  let formattedDate = `${dayName} ${dayNumber}, ${hour}:${minute}`;
  time.innerHTML = formattedDate;
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="weather-app-temperature-icon"
    />`;
}
let getForecast = function (city) {
  let apiKey = "eafo3c54a06d9f77ba3t96121805c98f";
  let apiUrlforecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrlforecast).then(displayForecast);
};

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    getForecast(response.data.cityInput);
    if (index < 5) {
      forecastHtml += `
   
    <div class="weather-forecast-item">
        <div class="weather-forecast-day">${formatDate(day.time)}</div>
        <div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        </div>
        <div class="weather-forecast-degree">
            <div class="weather-forecast-max-degree"><strong>${Math.round(
              day.temperature.maximum
            )}°C</strong></div>
            <div class="weather-forecast-min-degree">${Math.round(
              day.temperature.minimum
            )}°C</div>
        </div>
   `;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}
fetchWeather("Sydney");
getForecast("Sydney");
//deep peel should be avoided
//www.blackdermdirectory
//superficial
