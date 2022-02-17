document.addEventListener("DOMContentLoaded", () => {
  getQuotes()
  configureForm()
})

// Quote List Functions

function getQuotes() {
  fetch("http://localhost:3000/quotes?_embed=likes")
    .then(r => r.json())
    .then(quotes => displayQuotes(quotes)) 
}

function displayQuotes(quotes) {
    // check if sort button is active - if so, run sort by author
    //authorSort ? quotes.sort((a, b) => a.author.localeCompare(b.author)) : null
  let quoteListDiv = document.getElementById("quote-list")
  quoteListDiv.innerHTML = ""

  quotes.forEach(quote => {
    let quoteLi = createQuoteLi(quote)
    quoteListDiv.appendChild(quoteLi)
  })
}

function createQuoteLi(quote) {
  let quoteLi = document.createElement("li")
  quoteLi.className = "quote-card"
  quoteLi.id = quote.id
  quoteLi.innerHTML = ` <blockquote class='blockquote'>
    <p class="mb-0">${quote.quote}</p>
    <footer class='blockquote-footer'>${quote.author}</footer>
    <br>
    <button class='btn-success' id="${quote.id}">Likes: <span>${quote.likes.length}</span></button>
    <button class='btn-danger' id="${quote.id}">Delete</button>
  </blockquote>`

  quoteLi.addEventListener("click", e => handleBtnClicks(e))

  return quoteLi
}

function handleBtnClicks(e) {
  if (e.target.className === "btn-danger") {
    deleteQuote(e.target.id)
  } else if (e.target.className === "btn-success") {
    addLike(e.target.id)
  }
}

function deleteQuote(quoteId) {
  fetch(`http://localhost:3000/quotes/${quoteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => getQuotes())
}

function addLike(quoteId) {
  fetch(`http://localhost:3000/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quoteId: parseInt(quoteId),
      createdAt: Math.floor(Date.now()/1000),
    }),
  }).then(() => getQuotes())
}

// Form Functions

function configureForm() {
  let quoteForm = document.getElementById("new-quote-form")

  quoteForm.addEventListener("submit", e => {
    e.preventDefault()
    let newQuote = document.getElementById("new-quote")
    let newAuthor = document.getElementById("author")

    let formData = {
      quote: newQuote.value,
      author: newAuthor.value,
    }
    saveFormData(formData)
    quoteForm.reset()
  })
}

function saveFormData(formData) {
  fetch("http:localhost:3000/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(r => r.json())
    .then(() => getQuotes())
}

