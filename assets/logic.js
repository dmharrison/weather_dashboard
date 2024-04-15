console.log("you are connected");
//function to fetch weather data
function fetchWeather(city, state, country) {
  const apiKey = "a34bc89233dbec616ec7e18bb9ab5a30";
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${apiKey}`;
  return fetch(geoUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching geographical data:", error);
      throw error;
    });
}

// Call fetchWeather and log the data
fetchWeather("Marietta", "GA", "US")
  .then((data) => {
    console.log(data);
    // Continue with your code logic here
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
