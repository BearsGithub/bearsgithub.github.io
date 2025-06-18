const weatherIconMap = {
    1063: 'wi-day-showers',
    1066: 'wi-day-snow',
    1069: 'wi-day-sleet',
    1072: 'wi-day-sleet',
    1087: 'wi-day-thunderstorm',
    1114: 'wi-day-snow-wind',
    1117: 'wi-day-snow-wind',
    1135: 'wi-fog',
    1147: 'wi-fog',
    1150: 'wi-day-sprinkle',
    1153: 'wi-day-sprinkle',
    1168: 'wi-day-sleet',
    1171: 'wi-day-sleet',
    1180: 'wi-day-showers',
    1183: 'wi-day-showers',
    1186: 'wi-day-rain',
    1189: 'wi-day-rain',
    1192: 'wi-day-rain',
    1195: 'wi-day-rain',
    1198: 'wi-day-sleet',
    1201: 'wi-day-sleet',
    1204: 'wi-day-sleet',
    1207: 'wi-day-sleet',
    1210: 'wi-day-snow',
    1213: 'wi-day-snow',
    1216: 'wi-day-snow',
    1219: 'wi-day-snow',
    1222: 'wi-day-snow',
    1225: 'wi-day-snow',
    1237: 'wi-day-hail',
    1240: 'wi-day-showers',
    1243: 'wi-day-rain',
    1246: 'wi-day-rain',
    1249: 'wi-day-sleet',
    1252: 'wi-day-sleet',
    1255: 'wi-day-snow',
    1258: 'wi-day-snow',
    1261: 'wi-day-hail',
    1264: 'wi-day-hail',
    1273: 'wi-day-thunderstorm',
    1276: 'wi-day-thunderstorm',
    1279: 'wi-day-snow-thunderstorm',
    1282: 'wi-day-snow-thunderstorm'
  };
  
  async function fetchWeather() {
    const url = 'https://dev-perryweatherapi-ebcvgnagbvg7dubh.northcentralus-01.azurewebsites.net/forecast';
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        const data = await response.json();
        const conditionCode = data.data.weatherCode.value;
        const iconClass = weatherIconMap[conditionCode];
        const precipitation = data.data.precipitation.value;
        const precipitationChance = data.data.precipitationChance;

        if (precipitation > 0 || precipitationChance > 0) {
          document.getElementById('precipitation').textContent = precipitation;
          document.getElementById('precipitation-chance').textContent = precipitationChance;
          document.getElementById('weather-icon').className = `wi ${iconClass}`;
        } else {
          document.getElementById('weather-precipitation').style.display = 'none';
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
  }
  
  fetchWeather();
  