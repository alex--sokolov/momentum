import './css/owfont-regular.css';
import './css/styles.scss';
import Player from './player/player';
import Weather from './weather/weather';


const header = document.getElementById('header');
header.append(Player, Weather);

const time = document.querySelector('time');
const date = document.querySelector('date');

function showTime() {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
  time.textContent = currentTime;
  showDate(currentDate)
  setTimeout(showTime, 1000);
}

showTime();

function showDate(currentDate){
  const dateOptions = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'Europe/Minsk'};
  const currentDateLayout = currentDate.toLocaleDateString('en-Us', dateOptions);
  date.textContent = currentDateLayout;
}

showDate()

