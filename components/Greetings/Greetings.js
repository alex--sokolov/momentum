import htmlToElement from "../../utils/htmlToElement.js";
import Greetings from './Greetings.html';
import {setBg} from "../Background/bg";

let timerId;
export function showTime(time, date, greetings, body, randomNum, language, isTiming) {
  const currentDate = new Date();
  let curS = currentDate.getSeconds();
  let curM = currentDate.getMinutes();
  let curH = currentDate.getHours();
  if (curS === 0 && curM === 0 && (curH === 0 || curH === 6 || curH === 12 || curH === 18)) {
    setBg.bind(this, body, randomNum);
  }

  time.textContent = currentDate.toLocaleTimeString();

  showDate(date, currentDate, language);
  showGreetings(greetings, currentDate, language);
  if (!isTiming)
    timerId = setTimeout(showTime.bind(this, time, date, greetings, body, randomNum, language, false), 1000);
  else{
    clearTimeout(timerId);
    timerId = setTimeout(showTime.bind(this, time, date, greetings, body, randomNum, language, false), 1000);
  }
}
export function showDate(date, currentDate, language) {
  if (language === 'ru'){
    const dateOptions = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'Europe/Minsk'};
    date.textContent = currentDate.toLocaleDateString('ru-RU', dateOptions);
  }
  if (language === 'en'){
  const dateOptions = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'Europe/Minsk'};
  date.textContent = currentDate.toLocaleDateString('en-Us', dateOptions);
  }
}

export function showGreetings(greetings, currentDate, language) {
  if (language === 'ru'){
    greetings.textContent = `${getTimeOfDay(currentDate.getHours(), language)}`;
  }
  if (language === 'en') {
    greetings.textContent = `Good ${getTimeOfDay(currentDate.getHours(), language)}`;
  }
}

export function getTimeOfDay(hours, language) {
  if (language === 'ru') {
    return ['Доброй ночи', 'Доброе утро', 'Добый день', 'Добрый вечер'][Math.trunc(hours / 6)];
  }
  if (language === 'en') {
    return ['night', 'morning', 'afternoon', 'evening'][Math.trunc(hours / 6)];
  }
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, data.value);
}

export function getLocalStorage(key, data) {
  if (localStorage.getItem(key)) {
    data.value = localStorage.getItem(key);
  }
}

export default htmlToElement(Greetings);
