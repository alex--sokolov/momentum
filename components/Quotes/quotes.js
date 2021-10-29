import getRandomNum from "../../utils/randomNum";

export async function getQuotes(quote, author, language){
  const res = await fetch ('./assets/quotes.JSON');
  const data = await res.json();
  let randomNum = getRandomNum(20);
  author.textContent = language === 'en' ? data[randomNum - 1].author : data[randomNum - 1].authorRu;
  quote.textContent = language === 'en' ? data[randomNum - 1].quote : data[randomNum - 1].quoteRu;
}
