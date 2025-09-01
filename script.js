document.getElementById('searchBtn').addEventListener('click', getWeather);

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = '85950eb629667e6d9321693714bbab2f'; // Replace with your key

  if (!city) {
    document.getElementById('result').innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      document.getElementById('result').innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${weatherIcon}" alt="Weather icon">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
    } else {
      document.getElementById('result').innerHTML = "City not found!";
    }
  } catch (error) {
    document.getElementById('result').innerHTML = "Error fetching data!";
  }
}
