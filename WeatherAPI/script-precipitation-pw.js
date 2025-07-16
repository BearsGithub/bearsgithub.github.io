  
  async function fetchWeather() {
    const dailyurl = 'https://dev-perryweatherapi-ebcvgnagbvg7dubh.northcentralus-01.azurewebsites.net/dailyforecast';
    const hourlyurl = 'https://dev-perryweatherapi-ebcvgnagbvg7dubh.northcentralus-01.azurewebsites.net/hourlyforecast';

    try {
      const dailyresponse = await fetch(dailyurl);

      if (!dailyresponse.ok) {
        throw new Error(`HTTP error! status: ${dailyresponse.status}`);
      }
        const dailydata = await dailyresponse.json();
        //Getting todays total precipitation
        const precipitation = dailydata.data[0].precipitation.value.toFixed(2) ?? 0;
        const conditionCode = dailydata.data[0].weatherCode.value;

        const hourlyresponse = await fetch(hourlyurl);
        if (!hourlyresponse.ok) {
          throw new Error(`HTTP error! status: ${hourlyresponse.status}`);
        }
        const hourlydata = await hourlyresponse.json();
        //Getting the precipitation chance for the next hour's forecast
        const precipitationChance = hourlydata.data[1].precipitationChance.value ?? 0;

        if (precipitation > 0 || precipitationChance > 0) {
          document.getElementById('precipitation').textContent = precipitation;
          document.getElementById('precipitation-chance').textContent = precipitationChance;
          document.getElementById('weather-icon').src = `https://widget.perryweather.com/icons/weather/dark/${conditionCode}.svg`;
        } else {
          document.getElementById('weather-precipitation').style.display = 'none';
        }

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    
  }
  
  fetchWeather();