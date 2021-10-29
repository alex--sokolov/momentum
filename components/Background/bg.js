import {getTimeOfDay} from "../Greetings/Greetings";
import unsplash from "../imgAPI/unsplash";
import flickr from "../imgAPI/flickr";




export function setSrc(randomNum, timeOfDay) {
  const bgNum = ("" + randomNum).padStart(2, "0");
  let src = `https://raw.githubusercontent.com/alex--sokolov/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp`
  return src;

}
export function setBg(body, randomNum, tags, photoSource) {
  const currentDate = new Date();
  const timeOfDay = getTimeOfDay(currentDate.getHours(), 'en')
  const img = new Image();
  if (photoSource === 'Github') {
    img.src = setSrc(randomNum, timeOfDay);
    console.log("github: " + img.src);
    img.onload = () => {
      body.style.backgroundImage = `url('${img.src}')`
    };
  }
  else if (photoSource === 'Unsplash API') {
    unsplash(tags, timeOfDay, body, img);
  }
  else if (photoSource === 'Flickr API') {
    flickr(tags, timeOfDay, body, img, randomNum);
  }
}
