const windDirectionMap = {
    N: 'wi-towards-n',
    NNE: 'wi-towards-nne',
    NE: 'wi-towards-ne',
    ENE: 'wi-towards-ene',
    E: 'wi-towards-e',
    ESE: 'wi-towards-ese',
    SE: 'wi-towards-se',
    SSE: 'wi-towards-sse',
    S: 'wi-towards-s',
    SSW: 'wi-towards-ssw',
    SW: 'wi-towards-sw',
    WSW: 'wi-towards-wsw',
    W: 'wi-towards-w',
    WNW: 'wi-towards-wnw',
    NW: 'wi-towards-nw',
    NNW: 'wi-towards-nnw'
};

async function fetchWeather() {
  const url = 'https://dev-perryweatherapi-ebcvgnagbvg7dubh.northcentralus-01.azurewebsites.net/weather';
  
  try {
    console.log('Fetching weather data from:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    const windDirection = data.data.windDirection;
    const windDirectionClass = windDirectionMap[windDirection];

    document.getElementById('current-wind').textContent = data.data.windSpeed.value.toFixed(2);
    document.getElementById('current-wind-direction').textContent = windDirection;
    document.getElementById('max-wind').textContent = data.data.windGust.value.toFixed(2);
    document.getElementById('weather-icon-wind').className = `wi wi-wind windicon ${windDirectionClass}`;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

fetchWeather();