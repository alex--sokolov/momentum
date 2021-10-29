export default async function (tags, timeOfDay, body, img) {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags},${timeOfDay}&client_id=-lsFkEEisuoD6R4asgyxUSp1Wf1PW5-uAceFyQugC3o`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.urls.regular;
  console.log(url);
  console.log("unsplash: " + img.src);
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`
  };
}
