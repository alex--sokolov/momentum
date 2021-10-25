import getRandomNum from "../../utils/randomNum";

export async function getQuotes(quote, author){
  const res = await fetch ('./assets/quotes.JSON');
  const data = await res.json();
  let randomNum = getRandomNum(20);
  author.textContent = data[randomNum - 1].author;
  quote.textContent = data[randomNum - 1].quote;
}
