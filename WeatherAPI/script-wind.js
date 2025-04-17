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
    const apiKey = 'dd592801e36540649bb213133251604';
    const location = '42.2571,-87.8941';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      const windDirection = data.current.wind_dir;
      const windDirectionClass = windDirectionMap[windDirection];
  
      document.getElementById('current-wind').textContent = data.current.wind_mph;
      document.getElementById('current-wind-direction').textContent = windDirection;
      document.getElementById('max-wind').textContent = data.current.gust_mph;
      document.getElementById('weather-icon-wind').className = `wi wi-wind windicon ${windDirectionClass}`;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  fetchWeather();
  