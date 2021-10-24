import './css/owfont-regular.css';
import './css/styles.scss';
import player, {toggleBtn} from './components/Player/player';
import Weather, {getWeather} from './components/Weather/weather';
import TimeDateGreetings, {
  showTime,
  showDate,
  showGreetings,
  getTimeOfDay,
  setLocalStorage, getLocalStorage,
} from './components/TimeDateGreetings/timeDateGreetings';
import getRandomNum from "./utils/randomNum";
import {setBg} from "./components/Background/bg";
import {getQuotes} from "./components/Quotes/quotes";
import playlist from "./components/Player/playlist";


const body = document.querySelector('body');
const header = document.getElementById('header');
const main = document.querySelector('.main');
header.append(
  player,
  Weather
);
main.append(
  TimeDateGreetings
);
/* Time, date, greetings */
const time = document.querySelector('time');
const date = document.querySelector('date');
const greetings = document.querySelector('span.greeting');
const inputName = document.querySelector('input.name');
let randomNum = getRandomNum(20);
showTime(time, date, greetings, body, randomNum);

window.addEventListener('beforeunload', setLocalStorage.bind(this, inputName))
window.addEventListener('load', getLocalStorage.bind(this, inputName))


/* Changing bg */


setBg(body, randomNum);

function getSlideNext() {
  randomNum = randomNum === 20 ? 1 : randomNum + 1;
  setBg(body, randomNum);
}

function getSlidePrev() {
  randomNum = randomNum === 1 ? 20 : randomNum - 1;
  setBg(body, randomNum);
}


const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);
const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);


/* Weather */
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('input.city')
city.value = 'Minsk';


getWeather(weatherIcon, temperature, weatherDescription, wind, humidity, weatherError, city)

function setWeather(weatherIcon, temperature, weatherDescription, wind, humidity, weatherError, city) {
  localStorage.setItem('city', city.value);
  getWeather(weatherIcon, temperature, weatherDescription, wind, humidity, weatherError, city);
}

city.addEventListener('change', setWeather.bind(this, weatherIcon, temperature, weatherDescription, wind, humidity, weatherError, city))

/* quotes */

const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes.bind(this, quote, author));

getQuotes(quote, author);

/* player */

const play = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
let playNum = 0;
const playListContainer = document.querySelector('.play-list');
playlist.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li)
})
const audio = new Audio();

let isPlay = false;

play.addEventListener('click', playAudio)
play.addEventListener('click', toggleBtn.bind(this, play))
playPrevBtn.addEventListener('click', playPrev)
playNextBtn.addEventListener('click', playNext)

function playAudio() {
  if (!isPlay) {
    isPlay = true;
    console.log(playNum);
    audio.src = playlist[playNum].src;
    audio.play();
  } else {
    isPlay = false;
    audio.pause();
  }
}

function playPrev(){
  playNum = playNum === 0 ? playlist.length - 1 : playNum - 1;
  isPlay = false;
  audio.currentTime = 0;
  playAudio()
}

function playNext(){
  playNum = playNum === playlist.length - 1 ? 0 : playNum + 1;
  isPlay = false;
  audio.currentTime = 0;
  playAudio()
}


