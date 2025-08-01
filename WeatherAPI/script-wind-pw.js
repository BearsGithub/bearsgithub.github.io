const windDirectionMap = {
    N: 'wi-towards-s',
    NNE: 'wi-towards-ssw',
    NE: 'wi-towards-sw',
    ENE: 'wi-towards-wsw',
    E: 'wi-towards-w',
    ESE: 'wi-towards-wnw',
    SE: 'wi-towards-nw',
    SSE: 'wi-towards-nnw',
    S: 'wi-towards-n',
    SSW: 'wi-towards-nne',
    SW: 'wi-towards-ne',
    WSW: 'wi-towards-ene',
    W: 'wi-towards-e',
    WNW: 'wi-towards-ese',
    NW: 'wi-towards-se',
    NNW: 'wi-towards-sse'
};

const windDirectionLookup = {
    N: 'S',
    NNE: 'SSW',
    NE: 'SW',
    ENE: 'WSW',
    E: 'W',
    ESE: 'WNW',
    SE: 'NW',
    SSE: 'NNW',
    S: 'N',
    SSW: 'NNE',
    SW: 'NE',
    WSW: 'ENE',
    W: 'E',
    WNW: 'ESE',
    NW: 'SE',
    NNW: 'SSE'
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
    const windBlowingDirection = windDirectionLookup[windDirection];
    const windDirectionClass = windDirectionMap[windDirection];

    document.getElementById('current-wind').textContent = Number(data.data.windSpeed.value.toFixed(2));
    document.getElementById('current-wind-direction').textContent = windBlowingDirection;
    document.getElementById('max-wind').textContent = Number(data.data.windGust.value.toFixed(2));
    document.getElementById('weather-icon-wind').className = `wi wi-wind windicon ${windDirectionClass}`;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

fetchWeather();