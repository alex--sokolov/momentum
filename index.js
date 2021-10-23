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

/* get random integer from 1 to 20 */
function getRandomNum(max) {
  return Math.floor(Math.random() * max) + 1;
}

function setBg(randomNum) {
  const currentDate = new Date();
  const timeOfDay = getTimeOfDay(currentDate.getHours())
  const bgNum = ("" + randomNum).padStart(2, "0");
  // console.log("Set: " + bgNum);
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

