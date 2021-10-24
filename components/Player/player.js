import htmlToElement from "../../utils/htmlToElement.js";
import Player from './player.html'
const player = htmlToElement(Player);

export function toggleBtn(play) {
  play.classList.toggle('pause');
}

export default player
