function getAnimatedIcon(weatherbitCode) {
  const map = {
    // Clear sky
    'c01d': 'day.svg',
    'c01n': 'night.svg',

    // Few clouds
    'c02d': 'cloudy-day-2.svg',
    'c02n': 'cloudy-night-2.svg',

    // Scattered clouds
    'c03d': 'cloudy-day-3.svg',
    'c03n': 'cloudy-night-3.svg',

    // Broken clouds / overcast
    'c04d': 'cloudy.svg',
    'c04n': 'cloudy.svg',

    // Light rain / drizzle
    'r01d': 'rainy-1.svg',
    'r01n': 'rainy-1.svg',
    'r02d': 'rainy-2.svg',
    'r02n': 'rainy-2.svg',
    'r03d': 'rainy-3.svg',
    'r03n': 'rainy-3.svg',
    'r04d': 'rainy-4.svg',
    'r04n': 'rainy-4.svg',
    'r05d': 'rainy-5.svg',
    'r05n': 'rainy-5.svg',
    'r06d': 'rainy-6.svg',
    'r06n': 'rainy-6.svg',

    // Snow
    's01d': 'snowy-1.svg',
    's01n': 'snowy-1.svg',
    's02d': 'snowy-2.svg',
    's02n': 'snowy-2.svg',
    's03d': 'snowy-3.svg',
    's03n': 'snowy-3.svg',
    's04d': 'snowy-4.svg',
    's04n': 'snowy-4.svg',
    's05d': 'snowy-5.svg',
    's05n': 'snowy-5.svg',
    's06d': 'snowy-6.svg',
    's06n': 'snowy-6.svg',

    // Thunderstorms
    't01d': 'thunder.svg',
    't01n': 'thunder.svg',
    't02d': 'thunder.svg',
    't02n': 'thunder.svg',
    't03d': 'thunder.svg',
    't03n': 'thunder.svg',
    't04d': 'thunder.svg',
    't04n': 'thunder.svg',
    't05d': 'thunder.svg',
    't05n': 'thunder.svg',

    // Fog, haze, mist, dust, smoke, ash
    'a01d': 'fog.svg',
    'a01n': 'fog.svg',
    'a02d': 'fog.svg',
    'a02n': 'fog.svg',
    'a03d': 'fog.svg',
    'a03n': 'fog.svg',
    'a04d': 'fog.svg',
    'a04n': 'fog.svg',
    'a05d': 'fog.svg',
    'a05n': 'fog.svg',
    'a06d': 'fog.svg',
    'a06n': 'fog.svg',

    // Extreme wind/tornado
    'w01d': 'cloudy.svg',
    'w01n': 'cloudy.svg',

    // Fallback
    'default': 'cloudy.svg'
  };

  const iconFile = map[weatherbitCode] || map['default'];
  return `https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/${iconFile}`;
}

const apiKey = '220496ca8f8a41ba85803be9b16c7925';

fetch(`https://api.weatherbit.io/v2.0/current?postal_code=60045&country=US&units=I&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const current = data.data[0];
    const iconUrl = getAnimatedIcon(current.weather.icon);
    // Convert wind speed to mph if needed and precipitation to inches
    const windMph = (current.wind_spd * 2.237).toFixed(1);
    const precipInches = (current.precip * 0.03937).toFixed(2);

    // Assign the values to the individual HTML elements
    document.getElementById('current-icon').src = iconUrl;
    document.getElementById('current-icon').alt = current.weather.description;
    document.getElementById('current-temp').innerText = `${current.temp}°F`;
  document.getElementById('weather-description').innerText = `${current.weather.description}`;
    document.getElementById('wind-speed').innerText = `${Math.round(windMph)} mph`;
    document.getElementById('wind-direction').innerText = `${current.wind_cdir}`;
    document.getElementById('current-precip').innerText = `${precipInches} in`;
  })
  .catch(error => console.error('Error fetching current weather:', error));


fetch(`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=60045&country=US&units=I&days=3&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const forecast = data.data.slice(0, 3); // Get 3-day forecast
    const forecastGrid = document.querySelector('.forecast-grid');
    forecastGrid.innerHTML = ''; // Clear static HTML if needed

    forecast.forEach(day => {
      const iconUrl = getAnimatedIcon(day.weather.icon);
      const windMph = (day.wind_spd * 2.237).toFixed(1);
      const [year, month, dayNum] = day.datetime.split('-');
      const date = new Date(year, month - 1, dayNum); // month is 0-indexed in JS
      const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });


      const div = document.createElement('div');
      div.classList.add('forecast-day');
      div.innerHTML = `
        <div class="forecast-date">${monthDay}</div>
        <img class="forecast-icon" src="${iconUrl}" alt="${day.weather.description}" />
        <div class="forecast-temp">${Math.round(day.max_temp)}°F</div>
        <div class="forecast-description">${day.weather.description}</div>
        <div class="forecast-precip">Chance of Rain: ${day.pop}%</div>
        <div class="forecast-wind-speed-stack">Wind:&nbsp;<span class="forecast-wind-speed">${Math.round(windMph)} mph</span></div>
<div class="forecast-wind-direction-stack">Direction:&nbsp;<span class="forecast-wind-direction">${day.wind_cdir}</span></div>
      `;
      forecastGrid.appendChild(div);
    });
  })
  .catch(error => console.error('Error fetching forecast:', error));