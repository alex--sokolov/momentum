import htmlToElement from "../../utils/htmlToElement.js";
import Player from './player.html'
const player = htmlToElement(Player);

export function toggleBtn(play, advancedPlay) {
  if(play)
  play.classList.toggle('pause');
  if(advancedPlay)
  advancedPlay.classList.toggle('pause');
}

export function toggleBtnItem(playItem) {
  if (playItem){
   playItem.classList.toggle('item-active');
   playItem.classList.toggle('item-pause');
  }
}


export default player
