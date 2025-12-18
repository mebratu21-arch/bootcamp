// weather.js
const axios = require("axios");
const chalk = require("chalk");

// Replace with your OpenWeatherMap API key
const API_KEY = "YOUR_API_KEY";

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    const temp = data.main.temp;
    const description = data.weather[0].description;

    console.log(chalk.blue.bold(`Weather in ${city}:`));
    console.log(chalk.green(`🌡 Temperature: ${temp}°C`));
    console.log(chalk.yellow(`☁ Condition: ${description}`));
  } catch (error) {
    console.error(chalk.red("Error fetching weather data:", error.message));
  }
}

module.exports = getWeather;
