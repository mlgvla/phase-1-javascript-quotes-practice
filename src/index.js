document.addEventListener("DOMContentLoaded", () => {
  getQuotes()
})

function getQuotes() {
  fetch("http://localhost:3000/quotes?_embed=likes")
    .then(r => r.json())
    .then(quotes => displayQuotes(quotes))
}

function displayQuotes(quotes) {
  let quoteListDiv = document.getElementById("quote-list")
  quotes.forEach(quote => {
    let quoteLi = createQuoteLi(quote)
    quoteListDiv.appendChild(quoteLi)
  })
}

function createQuoteLi(quote) {
  //console.log(quote)
  let quoteLi = document.createElement("li")
  quoteLi.className = "quote-card"
  quoteLi.id = quote.id
  quoteLi.innerHTML = ` <blockquote class='blockquote'>
    <p class="mb-0">${quote.quote}</p>
    <footer class='blockquote-footer'>${quote.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
    <button class='btn-danger'>Delete</button>
  </blockquote>`

  return quoteLi
}
