async function fetchTempAndPrecip() {
    const hourlyurl = 'https://dev-perryweatherapi-ebcvgnagbvg7dubh.northcentralus-01.azurewebsites.net/hourlyforecast';

    try {
        const hourlyresponse = await fetch(hourlyurl);
        if (!hourlyresponse.ok) {
            throw new Error(`HTTP error! status: ${hourlyresponse.status}`);
        }
        const hourlydata = await hourlyresponse.json();

        // Next hour's forecasted precipitation amount and chance
        const precipitation = Number(hourlydata.data[1].precipitation.value.toFixed(2)) ?? 0;
        const precipitationChance = hourlydata.data[1].precipitationChance.value ?? 0;
        const conditionCode = hourlydata.data[1].weatherCode.value;

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

fetchTempAndPrecip();