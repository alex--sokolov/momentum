import './css/owfont-regular.css';
import './css/styles.scss';
import Player from './components/Player/player';
import Weather from './components/Weather/weather';
import TimeDateGreetings from './components/TimeDateGreetings/timeDateGreetings';


const body = document.querySelector('body');
const header = document.getElementById('header');
const main = document.querySelector('.main');
header.append(
  Player,
  Weather
);
main.append(
  TimeDateGreetings
);

/* Time, date, greetings */
const time = document.querySelector('time');
const date = document.querySelector('date');
const greetings = document.querySelector('span.greeting');

function showTime() {
  const currentDate = new Date();
  time.textContent = currentDate.toLocaleTimeString();
  showDate(currentDate);
  showGreetings(currentDate);
  setTimeout(showTime, 1000);
}

function showDate(currentDate) {
  const dateOptions = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'Europe/Minsk'};
  date.textContent = currentDate.toLocaleDateString('en-Us', dateOptions);
}

function showGreetings(currentDate) {
  greetings.textContent = `Good ${getTimeOfDay(currentDate.getHours())}`;
}

function getTimeOfDay(hours) {
  return ['night', 'morning', 'afternoon', 'evening'][Math.trunc(hours / 6)];
}

showTime();


const inputName = document.querySelector('input.name');

function setLocalStorage() {
  localStorage.setItem('name', inputName.value);
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    inputName.value = localStorage.getItem('name');
  }
}

window.addEventListener('load', getLocalStorage)


/* Changing bg */

function getRandomNum(max) {
  return Math.floor(Math.random() * max) + 1;
}

function setBg(randomNum) {
  const currentDate = new Date();
  const timeOfDay = getTimeOfDay(currentDate.getHours())
  const bgNum = ("" + randomNum).padStart(2, "0");
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/alex--sokolov/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp`
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`
  };
}

let randomNum = getRandomNum(20);
setBg(randomNum);
const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);
const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);

function getSlideNext() {
  randomNum = randomNum === 20 ? 1 : randomNum + 1;
  setBg(randomNum);
}

function getSlidePrev() {
  randomNum = randomNum === 1 ? 20 : randomNum - 1;
  setBg(randomNum);
}


/* Weather */
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

const city = document.querySelector('input.city')
city.value = 'Minsk';

async function getWeather() {
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

getWeather()

function setWeather() {
  localStorage.setItem('city', this.value);
  getWeather();
}

city.addEventListener('change', setWeather)

/* quotes */


const quote = document.querySelector('.quote')
const author = document.querySelector('.author')

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes)


async function getQuotes(){
  const res = await fetch ('./assets/quotes.JSON');
  const data = await res.json();
  let randomNum = getRandomNum(20);
  quote.textContent = data[randomNum-1].quote;
  author.textContent = data[randomNum-1].author;
}

getQuotes();
