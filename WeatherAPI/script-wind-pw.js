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


const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 30000;

async function fetchWeather() {
  const url = 'https://dev-perryweatherapi-ebcvgnagbvg7dubh.northcentralus-01.azurewebsites.net/weather';
  const hourlyurl = 'https://dev-perryweatherapi-ebcvgnagbvg7dubh.northcentralus-01.azurewebsites.net/hourlyforecast';

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

    const hourlyresponse = await fetch(hourlyurl);
    if (!hourlyresponse.ok) {
      throw new Error(`HTTP error! status: ${hourlyresponse.status}`);
    }
    const hourlydata = await hourlyresponse.json();

    const temperature = Number(data.data.feelLike.value.toFixed(0)) ?? 0;
    const windSpeed = Number(data.data.windSpeed.value.toFixed(1));
    const windGust = Number(data.data.windGust.value.toFixed(1));
    const conditionCodeHour = hourlydata.data[0].weatherCode.value;

    if (isNaN(temperature) || isNaN(windSpeed)) {
      throw new Error('Invalid data: temperature or wind speed is NaN');
    }

    document.getElementById('temperature').textContent = `${temperature}°F`;
    document.getElementById('temperature-icon').src = `https://widget.perryweather.com/icons/weather/dark/${conditionCodeHour}.svg`;

    document.getElementById('current-wind').textContent = windSpeed;
    document.getElementById('current-wind-direction').textContent = windBlowingDirection;
    document.getElementById('max-wind').textContent = windGust;
    document.getElementById('weather-icon-wind').className = `wi wi-wind windicon ${windDirectionClass}`;

    return true;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return false;
  }
}

async function fetchWithRetry() {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`Weather fetch attempt ${attempt} of ${MAX_RETRIES}`);
    const success = await fetchWeather();
    if (success) return;
    if (attempt < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
  console.error('All weather fetch attempts failed.');
}

fetchWithRetry();