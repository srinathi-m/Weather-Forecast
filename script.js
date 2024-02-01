const apiKey = 'e867a22beefc5e8d56cc051f8ba9f076';

function getWeather() {
  const cityInput = document.getElementById('cityInput').value;
  const unit = document.querySelector('input[name="unit"]:checked').value;

  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${unit}&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=${unit}&appid=${apiKey}`;

  // Fetch current weather data
  fetch(currentWeatherURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => displayCurrentWeather(data))
    .catch(error => {
      console.error(error);
      displayError('City not found. Please enter a valid city name.');
    });

  // Fetch 5-day forecast data
  fetch(forecastURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => displayForecast(data))
    .catch(error => {
      console.error(error);
      displayError('City not found. Please enter a valid city name.');
    });
}

function displayError(message) {
  const weatherDetails = document.getElementById('weatherDetails');
  const forecastDetails = document.getElementById('forecastDetails');

  weatherDetails.innerHTML = `<p class="error">${message}</p>`;
  forecastDetails.innerHTML = ''; // Clear forecast details on error
}

function displayCurrentWeather(data) {
  const weatherDetails = document.getElementById('weatherDetails');
  weatherDetails.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp} &deg;</p>
    <p>Min/Max Temperature: ${data.main.temp_min} / ${data.main.temp_max} &deg;</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${data.wind.speed} m/s, ${data.wind.deg}&deg;</p>
    <p>Description: ${data.weather[0].description}</p>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
  `;
}

function displayForecast(data) {
  const forecastDetails = document.getElementById('forecastDetails');
  forecastDetails.innerHTML = '<h2>5-Day Forecast</h2>';
  
  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const date = new Date(forecast.dt_txt);
    
    forecastDetails.innerHTML += `
      <div class="forecast-item">
        <p>Date: ${date.toDateString()}</p>
        <p>Avg. Temperature: ${forecast.main.temp} &deg;</p>
        <p>Description: ${forecast.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather Icon">
      </div>
    `;
  }
}
