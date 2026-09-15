const PRECIP_MAX_RETRIES = 5;
const PRECIP_RETRY_DELAY_MS = 30000;

async function fetchTempAndPrecip() {
    const hourlyurl = 'https://dev-perryweatherapi-ebcvgnagbvg7dubh.northcentralus-01.azurewebsites.net/hourlyforecast';

    try {
        const hourlyresponse = await fetch(hourlyurl);
        if (!hourlyresponse.ok) {
            throw new Error(`HTTP error! status: ${hourlyresponse.status}`);
        }
        const hourlydata = await hourlyresponse.json();

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

        return true;
    } catch (error) {
        console.error('Error fetching precipitation data:', error);
        return false;
    }
}

async function fetchPrecipWithRetry() {
    for (let attempt = 1; attempt <= PRECIP_MAX_RETRIES; attempt++) {
        console.log(`Precipitation fetch attempt ${attempt} of ${PRECIP_MAX_RETRIES}`);
        const success = await fetchTempAndPrecip();
        if (success) return;
        if (attempt < PRECIP_MAX_RETRIES) {
            console.log(`Retrying precipitation in ${PRECIP_RETRY_DELAY_MS / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, PRECIP_RETRY_DELAY_MS));
        }
    }
    console.error('All precipitation fetch attempts failed.');
}

fetchPrecipWithRetry();