  
  async function fetchWeather() {
    const dailyurl = 'https://dev-perryweatherapi-ebcvgnagbvg7dubh.northcentralus-01.azurewebsites.net/dailyforecast';
    const hourlyurl = 'https://dev-perryweatherapi-ebcvgnagbvg7dubh.northcentralus-01.azurewebsites.net/hourlyforecast';

    try {
      const dailyresponse = await fetch(dailyurl);

      if (!dailyresponse.ok) {
        throw new Error(`HTTP error! status: ${dailyresponse.status}`);
      }
        const dailydata = await dailyresponse.json();
        //Getting todays 
        const precipitationChance = dailydata.data[0].precipitationChance.value ?? 0;
        const conditionCode = dailydata.data[0].weatherCode.value;

        const hourlyresponse = await fetch(hourlyurl);
        if (!hourlyresponse.ok) {
          throw new Error(`HTTP error! status: ${hourlyresponse.status}`);
        }
        const hourlydata = await hourlyresponse.json();
        //Getting the precipitation change for the next hour's forecast
        const precipitation = hourlydata.data[1].precipitation.value;
        
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