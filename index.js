import './css/owfont-regular.css';
import './css/styles.scss';
import player, {toggleBtn} from './components/Player/player';
import advancedPlayer from "./components/AdvancedPlayer/advancedPlayer";
import weatherFunc, {getWeather} from './components/Weather/weather';
import greetingsFunc, {
  showTime,
  setLocalStorage,
  getLocalStorage,
} from './components/Greetings/Greetings';
import getRandomNum from "./utils/randomNum";
import {setBg} from "./components/Background/bg";
import {getQuotes} from "./components/Quotes/quotes";
import playlist from "./components/Player/playlist";
import {getTimeCodeFromNum} from "./components/AdvancedPlayer/advancedPlayer";
import settings from "./components/Settings/settings";
import timeFunc from "./components/Time/time";
import dateFunc from "./components/Date/date";


const body = document.querySelector('body');
const header = document.getElementById('header');
const footer = document.querySelector('footer');
const main = document.querySelector('.main');


let state = JSON.parse (localStorage.getItem('state'));

let language = state.language || 'en';
let photoSource = state.photoSource || 'Github';
let isTime = state.time || 'off';
let isDate = state.date || 'off';
let isGreetings = state.greetings || 'off';
let isQuotes = state.quotes || 'off';
let isWeather = state.weather || 'off';
let isAudio = state.audio || 'off';

header.append(player, advancedPlayer);
header.append(weatherFunc);
main.append(timeFunc);
main.append(dateFunc);
main.append(greetingsFunc);

footer.append(settings);

/* Time, date, greetings */



const time = document.querySelector('time');
const date = document.querySelector('date');
const greetings = document.querySelector('span.greeting');
const inputName = document.querySelector('input.name');
let randomNum = getRandomNum(20);
showTime(time, date, greetings, body, randomNum);

window.addEventListener('beforeunload', setLocalStorage.bind(this, 'name', inputName))
window.addEventListener('load', getLocalStorage.bind(this, 'name', inputName))


if (isTime === 'on') time.style.opacity = '0';
if (isDate === 'on') date.style.opacity = '0';
if (isGreetings === 'on') {
  greetings.style.opacity = '0';
  inputName.style.opacity = '0';
}

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
const weatherElement = document.querySelector('.weather');
const weatherIcon = weatherElement.querySelector('.weather-icon');
const temperature = weatherElement.querySelector('.temperature');
const weatherDescription = weatherElement.querySelector('.weather-description');
const wind = weatherElement.querySelector('.wind');
const humidity = weatherElement.querySelector('.humidity');
const weatherError = weatherElement.querySelector('.weather-error');
const city = weatherElement.querySelector('input.city')
city.value = 'Minsk';

getWeather(weatherIcon, temperature, weatherDescription, wind, humidity, weatherError, city)

function setWeather(weatherIcon, temperature, weatherDescription, wind, humidity, weatherError, city) {
  localStorage.setItem('city', city.value);
  getWeather(weatherIcon, temperature, weatherDescription, wind, humidity, weatherError, city);
}

city.addEventListener('change', setWeather.bind(this, weatherIcon, temperature, weatherDescription, wind, humidity, weatherError, city))

if (isWeather === 'on') weatherElement.style.opacity = '0';


/* quotes */
const quotesElement = document.querySelector('.section-quotes')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes.bind(this, quote, author));

getQuotes(quote, author);


if (isQuotes === 'on') quotesElement.style.opacity = '0';

/* player */
const playerElement = document.querySelector('.player');
const play = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const advancedPlay = document.querySelector('.advanced-play');
const advancedPlayPrevBtn = document.querySelector('.advanced-play-prev');
const advancedPlayNextBtn = document.querySelector('.advanced-play-next');
const songTitle = document.querySelector('.song-title');
const durationCurrent = document.querySelector('.duration-current');
const durationTotal = document.querySelector('.duration-total');
const progressDurationBar = document.querySelector('.progress-duration-bar');

let playNum = 0;
const playListContainer = document.querySelector('.play-list');
playlist.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li);
});

const playList = document.querySelectorAll('.play-item');
document.querySelectorAll('.play-item').forEach((el, index) =>
  el.addEventListener('click', () => playNext(index))
)

const audio = new Audio();
let isPlay = false;
let isAdvancedPlayer = false;
let isProgressDurationListened = false;
let isProgressVolumeListened = false;
let k = playNum;
let isVolumeHasListenerOnclick = false;
let timerId = false;


play.addEventListener('click', playAudio);
play.addEventListener('click', toggleBtn.bind(this, play, advancedPlay));
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
advancedPlay.addEventListener('click', playAudio);
advancedPlay.addEventListener('click', toggleBtn.bind(this, play, advancedPlay));
advancedPlayPrevBtn.addEventListener('click', playPrev);
advancedPlayNextBtn.addEventListener('click', playNext);


audio.src = playlist[playNum].src;
audio.volume = 0.50;

function playAudio() {
  const advancedPlayer = document.querySelector('.advanced-player');
  const volume = advancedPlayer.querySelector('.volume');
  const progressDuration = document.querySelector('.progress-duration');
  const progressVolume = document.querySelector('.progress-volume');

  progressDuration.style.backgroundColor = '#fff';

  songTitle.style.opacity = 1;
  progressDurationBar.style.opacity = 1;

  if (!isPlay) {
    if (!isAdvancedPlayer) {
      durationCurrent.insertAdjacentHTML("afterend", ' / ');
      isAdvancedPlayer = true;
      advancedPlayer.style.opacity = 1;
    }
    if (k !== playNum) {
      audio.src = playlist[playNum].src;
      k = playNum;
    }

    isPlay = true;
    playList[playNum].classList.add('item-active');
    songTitle.textContent = playlist[playNum].title;
    audio.play();

    if (timerId) {
      clearInterval(timerId)
      timerId = false;
    }

    //Progress bars
    if (!isProgressDurationListened) {
      progressDuration.addEventListener('input', function () {
        const value = this.value;
        audio.currentTime = value / 100 * audio.duration;
        this.style.background = `linear-gradient(to right, #0498bf 0%,
    #0498bf ${value}%, #fff ${value}%, white 100%)`;
      });
      isProgressDurationListened = true;
    }

    if (!isProgressVolumeListened) {
      progressVolume.addEventListener('input', function (e) {
        const value = this.value;
        if (value <= 1) {
          audio.muted = true;
          volume.classList.add('mute')
        } else {
          audio.muted = false;
          volume.classList.remove('mute');
        }
        audio.volume = value / 100;
        this.style.background = `linear-gradient(to right, #0498bf 0%,
    #0498bf ${value}%, #fff ${value}%, white 100%)`;
      });
      isProgressVolumeListened = true;
    }

    function muteUnmute() {
      audio.muted = !audio.muted;
      console.log("audio muted: " + audio.muted);
      if (audio.muted) {
        progressVolume.value = 1;
        progressVolume.style.background = '#fff';
        volume.classList.add('mute');
      } else {
        progressVolume.value = audio.volume * 100;
        progressVolume.style.background = `linear-gradient(to right, #0498bf 0%,
    #0498bf ${progressVolume.value}%, #fff ${progressVolume.value}%, white 100%)`;
        volume.classList.remove('mute');
      }
    }

    if (!isVolumeHasListenerOnclick) {
      volume.addEventListener('click', muteUnmute);
      isVolumeHasListenerOnclick = true;
    }

    timerId = setInterval(() => {
      progressDuration.value = audio.currentTime / audio.duration * 100;
      progressDuration.style.background = `linear-gradient(to right, #0498bf 0%,
    #0498bf ${progressDuration.value}%, #fff ${progressDuration.value}%, white 100%)`;
      durationCurrent.textContent = getTimeCodeFromNum(audio.currentTime);
    }, 500);
    setTimeout(() => {
      durationTotal.textContent = audio.duration > 0 ? getTimeCodeFromNum(audio.duration) : '00:00'
    }, 500)
  } else {
    isPlay = false;
    audio.pause();
  }

}


function playPrev(indexNum) {
  if (!isPlay) toggleBtn(play, advancedPlay);
  playList[playNum].classList.remove('item-active');
  playList[playNum].classList.remove('item-active');
  if (indexNum >= 0) playNum = indexNum;
  else playNum = playNum === 0 ? playlist.length - 1 : playNum - 1;
  isPlay = false;
  audio.currentTime = 0;
  songTitle.style.opacity = 0;
  progressDurationBar.style.opacity = 0;
  audio.pause();
  playAudio()
}

function playNext(indexNum) {

  if (!isPlay) toggleBtn(play, advancedPlay);
  playList[playNum].classList.remove('item-active');
  if (indexNum >= 0) playNum = indexNum;
  else playNum = playNum === playlist.length - 1 ? 0 : playNum + 1;
  isPlay = false;
  audio.pause();
  audio.currentTime = 0;
  songTitle.style.opacity = 0;
  progressDurationBar.style.opacity = 0;
  playAudio()
}

audio.addEventListener("ended", playNext);

if (isAudio === 'on') playerElement.style.opacity = '0';

/* Settings */
const Settings = document.querySelector('.settings');
let isShowSettings = false;
const ChangeSettings = document.querySelector('.change-settings');
ChangeSettings.addEventListener('click', openCloseSettings);

function openCloseSettings() {
  if (!isShowSettings) {
    isShowSettings = true;
    Settings.classList.add('show');

    changeForm();
    setTimeout(() => {
      Settings.classList.add('active');
    }, 500);
    const saveBtn = document.querySelector('.settings-save');
    saveBtn.addEventListener('click', saveSettings)
  }
  else {
    Settings.classList.remove('active');
    setTimeout(() => {
      Settings.classList.remove('show');
    }, 1800)
    isShowSettings = false;
  }
}


function changeForm(){
  state = JSON.parse (localStorage.getItem('state'));
  language = state.language || 'en';
  photoSource = state.photoSource || 'Github';
  isTime = state.time || 'off';
  isDate = state.date || 'off';
  isGreetings = state.greetings || 'off';
  isQuotes = state.quotes || 'off';
  isWeather = state.weather || 'off';
  isAudio = state.audio || 'off';

  const langEl = document.querySelector('#lang')
  const photoEl1 = document.querySelector('#radio-1')
  const photoEl2 = document.querySelector('#radio-2')
  const photoEl3 = document.querySelector('#radio-3')
  const timeEl = document.querySelector('#settime')
  const dateEl = document.querySelector('#setdate')
  const greetingsEl = document.querySelector('#setgreetings')
  const quotesEl = document.querySelector('#setquotes')
  const weatherEl = document.querySelector('#setweather')
  const audioEl = document.querySelector('#setaudio')

  if (language === 'ru') langEl.checked = true;
  switch (photoSource){
    case 'Github': photoEl1.checked = true; break;
    case 'Unsplash API': photoEl2.checked = true; break;
    default : photoEl3.checked = true;
  }
  if (isTime === 'on') timeEl.checked = true;
  if (isDate === 'on') dateEl.checked = true;
  if (isGreetings === 'on') greetingsEl.checked = true;
  if (isQuotes === 'on') quotesEl.checked = true;
  if (isWeather === 'on') weatherEl.checked = true;
  if (isAudio === 'on') audioEl.checked = true;













}


function saveSettings() {
  const advancedPlayerElement = document.querySelector('.advanced-player');
  const settings = document.querySelector('.settings');
  let langCh = settings.querySelector('#lang').checked ? 'ru' : 'en';
  let photoSourceCh = settings.querySelector('input[name="photoSrc"]:checked').id;
  switch (photoSourceCh) {
    case 'radio-1':  photoSourceCh = 'Github'; break;
    case 'radio-2':  photoSourceCh = 'Unsplash API'; break;
    default : photoSourceCh = 'Flickr API';
  }
  let timeCh = settings.querySelector('#settime').checked ? 'on' : 'off';
  let dateCh = settings.querySelector('#setdate').checked ? 'on' : 'off';
  let greetingsCh = settings.querySelector('#setgreetings').checked ? 'on' : 'off';
  let quotesCh = settings.querySelector('#setquotes').checked ? 'on' : 'off';
  let weatherCh = settings.querySelector('#setweather').checked ? 'on' : 'off';
  let audioCh = settings.querySelector('#setaudio').checked ? 'on' : 'off';

  const state = {
    language: langCh,
    photoSource: photoSourceCh,
    time: timeCh,
    date: dateCh,
    greetings : greetingsCh,
    quotes : quotesCh,
    weather : weatherCh,
    audio : audioCh
  }
  if (timeCh === 'on') time.style.opacity = '0';
  else time.style.opacity = '1';
  if (dateCh === 'on') date.style.opacity = '0';
  else date.style.opacity = '1';
  if (greetingsCh === 'on') {
    greetings.style.opacity = '0';
    inputName.style.opacity = '0';
  }
  else {
    greetings.style.opacity = '1';
    inputName.style.opacity = '1';
  }
  if (quotesCh === 'on') quotesElement.style.opacity = '0';
  else quotesElement.style.opacity = '1';
  if (weatherCh === 'on') weatherElement.style.opacity = '0';
  else weatherElement.style.opacity = '1';
  if (audioCh === 'on') {
    playerElement.style.opacity = '0';
    advancedPlayerElement.style.opacity = '0';
  }
  else {
    playerElement.style.opacity = '1';
  }




  localStorage.setItem ('state', JSON.stringify(state));
  openCloseSettings()
}



