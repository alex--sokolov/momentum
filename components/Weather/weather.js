import htmlToElement from "../../utils/htmlToElement.js";
import Weather from './weather.html'
export default htmlToElement(Weather);
export async function getWeather(weatherIcon, temperature, weatherDescription, wind, humidity, weatherError, city) {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=8347508b97f54d3010dc41640bfaf498&units=metric`;
  let res = await fetch(url);
  if (res.status !== 200) {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    wind.textContent = ``
    humidity.textContent = ``
    weatherError.textContent = city.value === '' ? `Error! Nothing to geocode for " !` : `Error! city not found for "${city.value}" !`;
  } else {
    weatherError.textContent = ``;
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`
    humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)} %`
  }
}
