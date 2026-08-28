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
    const game = getCurrentAwayGame();
    const apiKey = 'dd592801e36540649bb213133251604';
    const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${game.coords}`;
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${game.coords}&days=1&aqi=no&alerts=no`;

    try {
        document.getElementById('location-label').textContent = game.location;

        const response = await fetch(currentUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const windDirection = data.current.wind_dir;
        const windBlowingDirection = windDirectionLookup[windDirection];
        const windDirectionClass = windDirectionMap[windDirection];

        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error(`HTTP error! status: ${forecastResponse.status}`);
        }
        const forecastData = await forecastResponse.json();

        const temperature = Math.round(data.current.feelslike_f);
        const conditionIcon = data.current.condition.icon;

        document.getElementById('temperature').textContent = `${temperature}°F`;
        document.getElementById('temperature-icon').src = `https:${conditionIcon}`;

        document.getElementById('current-wind').textContent = data.current.wind_mph;
        document.getElementById('current-wind-direction').textContent = windBlowingDirection;
        document.getElementById('max-wind').textContent = data.current.gust_mph;
        document.getElementById('weather-icon-wind').className = `wi wi-wind windicon ${windDirectionClass}`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

fetchWeather();
