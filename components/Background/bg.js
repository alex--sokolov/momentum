import {getTimeOfDay} from "../Greetings/Greetings";

export function setBg(body, randomNum) {
  const currentDate = new Date();
  const timeOfDay = getTimeOfDay(currentDate.getHours())
  const bgNum = ("" + randomNum).padStart(2, "0");
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/alex--sokolov/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp`
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`
  };
}

