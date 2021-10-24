import htmlToElement from "../../utils/htmlToElement.js";
import TimeDateGreetings from './timeDateGreetings.html';
import {setBg} from "../Background/bg";


export function showTime(time, date, greetings, body, randomNum) {
  const currentDate = new Date();
  let curS = currentDate.getSeconds();
  let curM = currentDate.getMinutes();
  let curH = currentDate.getHours();
  if (curS === 0 && curM === 0 && (curH === 0 || curH === 6 || curH === 12 || curH === 18)) {
    setBg.bind(this, body, randomNum);
  }
  time.textContent = currentDate.toLocaleTimeString();
  showDate(date, currentDate);
  showGreetings(greetings, currentDate);
  setTimeout(showTime.bind(this, time, date, greetings, body, randomNum), 1000);
}

export function showDate(date, currentDate) {
  const dateOptions = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'Europe/Minsk'};
  date.textContent = currentDate.toLocaleDateString('en-Us', dateOptions);
}

export function showGreetings(greetings, currentDate) {
  greetings.textContent = `Good ${getTimeOfDay(currentDate.getHours())}`;
}

export function getTimeOfDay(hours) {
  return ['night', 'morning', 'afternoon', 'evening'][Math.trunc(hours / 6)];
}

export function setLocalStorage(inputName) {
  localStorage.setItem('name', inputName.value);
}

export function getLocalStorage(inputName) {
  if (localStorage.getItem('name')) {
    inputName.value = localStorage.getItem('name');
  }
}

export default htmlToElement(TimeDateGreetings);
