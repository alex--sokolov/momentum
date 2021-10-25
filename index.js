import './css/owfont-regular.css';
import './css/styles.scss';
import player, {toggleBtn} from './components/Player/player';
import Weather, {getWeather} from './components/Weather/weather';
import TimeDateGreetings, {
  showTime,
  setLocalStorage,
  getLocalStorage,
} from './components/TimeDateGreetings/timeDateGreetings';
import getRandomNum from "./utils/randomNum";
import {setBg} from "./components/Background/bg";
import {getQuotes} from "./components/Quotes/quotes";
import playlist from "./components/Player/playlist";
import advancedPlayer, {getTimeCodeFromNum} from "./components/AdvancedPlayer/advancedPlayer";


const body = document.querySelector('body');
const header = document.getElementById('header');
const main = document.querySelector('.main');
header.append(
  player,
  advancedPlayer,
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
const advancedPlay = document.querySelector('.advanced-play');
const advancedPlayPrevBtn = document.querySelector('.advanced-play-prev');
const advancedPlayNextBtn = document.querySelector('.advanced-play-next');
const songTitle = document.querySelector('.song-title');
const durationCurrent = document.querySelector('.duration-current');
const durationTotal = document.querySelector('.duration-total');

let playNum = 0;
const playListContainer = document.querySelector('.play-list');
playlist.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li)
});


const playList = document.querySelectorAll('.play-item');

const audio = new Audio();
let isPlay = false;
let isAdvancedPlayer = false;


play.addEventListener('click', playAudio);
play.addEventListener('click', toggleBtn.bind(this, play, advancedPlay));
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
advancedPlay.addEventListener('click', playAudio);
advancedPlay.addEventListener('click', toggleBtn.bind(this, play, advancedPlay));
advancedPlayPrevBtn.addEventListener('click', playPrev);
advancedPlayNextBtn.addEventListener('click', playNext);

let k = playNum;

audio.src = playlist[playNum].src;

audio.volume = 0.50;
console.log("volume: " + audio.volume);


function playAudio() {

  const advancedPlayer = document.querySelector('.advanced-player');
  const volume = advancedPlayer.querySelector('.volume')

  if (!isPlay) {
    if (!isAdvancedPlayer) {
      advancedPlayer.style.display = 'block';
      durationCurrent.insertAdjacentHTML("afterend", ' / ');
      isAdvancedPlayer = true;
    }
    if (k !== playNum) {
      audio.src = playlist[playNum].src;
      k = playNum;
    }

    isPlay = true;
    playList[playNum].classList.add('item-active');
    songTitle.textContent = playlist[playNum].title;
    audio.play();


    audio.addEventListener(
      "loadeddata",
      () => {
        durationTotal.textContent = getTimeCodeFromNum(audio.duration);
      },
      false
    );

//Progress bars

    const progressDuration = document.querySelector('.progress-duration');
    progressDuration.addEventListener('input', function () {
      const value = this.value;
      audio.currentTime = value / 100 * audio.duration;
      this.style.background = `linear-gradient(to right, #0498bf 0%,
    #0498bf ${value}%, #fff ${value}%, white 100%)`;
    });

    const progressVolume = document.querySelector('.progress-volume');
    progressVolume.addEventListener('input', function (e) {
      const value = this.value;
      if (value <= 1) {
        audio.muted = true;
        volume.classList.add('mute')
      }
      else{
        audio.muted = false;
        volume.classList.remove('mute');
      }
        audio.volume = value / 100;
      this.style.background = `linear-gradient(to right, #0498bf 0%,
    #0498bf ${value}%, #fff ${value}%, white 100%)`;
    });

    console.log(volume);
    volume.addEventListener('click', () => {
      audio.muted = !audio.muted;
      if (audio.muted) {
        progressVolume.value = 1;
        progressVolume.style.background = '#fff';
        volume.classList.add('mute');
        console.log(audio.volume);
      } else {
        progressVolume.value = audio.volume * 100;
        progressVolume.style.background = `linear-gradient(to right, #0498bf 0%,
    #0498bf ${progressVolume.value}%, #fff ${progressVolume.value}%, white 100%)`;
        volume.classList.remove('mute');
        console.log(audio.volume);
      }
    });


    setInterval(() => {
      progressDuration.value = audio.currentTime / audio.duration * 100;
      progressDuration.style.background = `linear-gradient(to right, #0498bf 0%,
    #0498bf ${progressDuration.value}%, #fff ${progressDuration.value}%, white 100%)`;
      durationCurrent.textContent = getTimeCodeFromNum(audio.currentTime);
    }, 500);
    setTimeout(() => {
      durationTotal.textContent = getTimeCodeFromNum(audio.duration)
    }, 500)

  } else {
    isPlay = false;
    audio.pause();
  }

}


function playPrev() {
  if (!isPlay) toggleBtn(play, advancedPlay);
  playList[playNum].classList.remove('item-active');
  playNum = playNum === 0 ? playlist.length - 1 : playNum - 1;
  isPlay = false;
  audio.currentTime = 0;
  playAudio()
}

function playNext() {
  if (!isPlay) toggleBtn(play, advancedPlay);
  playList[playNum].classList.remove('item-active');
  playNum = playNum === playlist.length - 1 ? 0 : playNum + 1;
  isPlay = false;
  audio.currentTime = 0;
  playAudio()
}

audio.addEventListener("ended", playNext);


/* Advanced audio player */







