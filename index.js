import './css/owfont-regular.css';
import './css/styles.scss';
import Player from './player/player';
import Weather from './weather/weather';

const header = document.getElementById('header');
header.append(Player, Weather);

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
  return ['night', 'morning', 'afternoon', 'evening'][Math.trunc(hours /6)];
}

showTime();


const inputName = document.querySelector('input.name');

function setLocalStorage() {
  localStorage.setItem('name', inputName.value);

  // console.log(p);



}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    inputName.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)


