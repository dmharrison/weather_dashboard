console.log("you are connected");
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("weather-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    let cityName; // Define cityName variable

    //  Make API call to Geo API
    const limit = 1;
    const apiKey = "a34bc89233dbec616ec7e18bb9ab5a30";

    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${apiKey}`;

    fetch(geoApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // get lat, lon and city name from response
        const lat = data[0].lat;
        const lon = data[0].lon;
        cityName = data[0].name;

        // Make API call to Forecast API using obtained latitude and longitude
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        return fetch(forecastApiUrl);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Extract forecast data for today and the next five days
        const forecastData = data.list
          .filter((item, index) => index % 8 === 0)
          .slice(0, 6); // Slice to get today's forecast and the next five days

        // display today's forecast
        const todayForecast = document.getElementById("today-forecast");
        todayForecast.innerHTML = `
                      <h2>${cityName}</h2> <!-- Display city name instead of "Today's Forecast" -->
                      <h3>Today's Forecast</h3>
                      <p>Date: ${forecastData[0].dt_txt}</p>
                      <p>Temperature: ${convertToCelsius(
                        forecastData[0].main.temp
                      )} °C / ${convertToFahrenheit(
          forecastData[0].main.temp
        )} °F</p>
                      <p>Wind: ${forecastData[0].wind.speed}</p>
                      <p>Humidity: ${forecastData[0].main.humidity}</p>
                  `;

        // display forecast data for the next five days
        const forecastInfo = document.getElementById("forecast-info");
        forecastInfo.innerHTML = "";

        forecastData.slice(0, 5).forEach((item) => {
          const forecastCard = document.createElement("div");
          forecastCard.classList.add("forecast-card");
          forecastCard.innerHTML = `
                          <h2>Date: ${item.dt_txt}</h2>
                          <p>Temperature: ${convertToCelsius(
                            item.main.temp
                          )} °C / ${convertToFahrenheit(item.main.temp)} °F</p>
                          <p>Wind: ${item.wind.speed}</p>
                          <p>Humidity: ${item.main.humidity}</p>
                      `;
          forecastInfo.appendChild(forecastCard);
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });

  // function to convert temperature from Kelvin to Celsius
  function convertToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }

  // function to convert temperature from Kelvin to Fahrenheit
  function convertToFahrenheit(kelvin) {
    return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  }
});
