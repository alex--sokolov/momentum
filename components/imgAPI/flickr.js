export default async function (tags, timeOfDay, body, img, randomNum) {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=de05a89ec58ae707808242a535793126&tags=${tags},${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.photos.photo[randomNum].url_l;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`
  };
}
