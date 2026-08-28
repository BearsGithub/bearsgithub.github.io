async function fetchPrecipitation() {
    const game = getCurrentAwayGame();
    const apiKey = 'dd592801e36540649bb213133251604';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${game.coords}&days=1&aqi=no&alerts=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const precipitation = data.current.precip_in;
        const conditionIcon = data.current.condition.icon;
        var precipitationChance = data.forecast.forecastday[0].day.daily_chance_of_rain;
        if (precipitationChance == 0) {
            precipitationChance = data.forecast.forecastday[0].day.daily_chance_of_snow;
        }

        if (precipitation > 0 || precipitationChance > 0) {
            document.getElementById('precipitation').textContent = precipitation;
            document.getElementById('precipitation-chance').textContent = precipitationChance;
            document.getElementById('weather-icon').src = `https:${conditionIcon}`;
        } else {
            document.getElementById('weather-precipitation').style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching precipitation data:', error);
    }
}

fetchPrecipitation();
