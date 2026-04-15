class Books {
  constructor(_title, _img, _asin, _category, _price) {
    this.thisTitle = _title
    this.thisImg = _img
    this.thisAsin = _asin
    this.thisCategory = _category
    this.thisPrice = _price
  }
}

// Fetching
const libreria = document.getElementById("library")
const urlFetching = "https://striveschool-api.herokuapp.com/books"
const creazioneLibri = function () {
  fetch(urlFetching)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Problema con la risposta", response.status)
      }
    })

    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        libreria.innerHTML += `
    <div id="book-${i}" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div class="card">
            <img src="${data[i].img}" class="book-img card-img-top" alt="${data[i].title}-cover">
            <div class="card-body">
                <h5 class="card-title main-title">${data[i].title}</h5>
                <h6 class="book-category card-subtitle mb-2 text-body-secondary">${data[i].category}</h6>
                <p class="card-text price-tag">${data[i].price}$</p>
                <h6 class="book-asin card-subtitle mb-2 text-body-secondary mb-3">${data[i].asin}</h6>
                <button onclick="addToCart(${i})" class="btn btn-primary">Aggiungi al carello</button>
                <button href="#" onclick="deleteBook(${i})" class="btn btn-danger">Scarta</button>
            </div>
        </div>
    </div>`
      }
    })
    .catch((error) => {
      console.log("il server non risponde", error)
    })
}
creazioneLibri()

//
// Cart

const bookTitle = document.getElementsByClassName("main-title")
const bookImg = document.getElementsByClassName("book-img")
const bookAsin = document.getElementsByClassName("book-asin")
const bookCategory = document.getElementsByClassName("book-category")
const bookPrice = document.getElementsByClassName("price-tag")
const cart = document.querySelector("#cartModal .modal-body .col-12")
const itemCartCount = document.getElementById("items-in-cart")
let arrayCart = []

const addToCart = function (e) {
  const thisTitle = bookTitle[e].innerText
  const thisImg = bookImg[e].getAttribute("src")
  const thisAsin = bookAsin[e].innerText
  const thisCategory = bookCategory[e].innerText
  const thisPrice = bookPrice[e].innerText

  arrayCart.push({
    title: thisTitle,
    img: thisImg,
    asin: thisAsin,
    category: thisCategory,
    price: thisPrice,
  })

  itemCartCount.innerText = arrayCart.length

  localStorage.setItem("books", JSON.stringify(arrayCart))
  cart.innerHTML += `<div class="card mb-3">
            <img src="${thisImg}" class="card-img-top" alt="${thisTitle}-cover">
            <div class="card-body">
                <h5 class="card-title">${thisTitle}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${thisCategory}</h6>
                <p class="card-text">${thisPrice}</p>
                <h6 class="card-subtitle mb-2 text-body-secondary mb-3">${thisAsin}</h6>
            </div>
        </div>`
}

memoryCart = localStorage.getItem("books")

if (memoryCart) {
  const parseCart = JSON.parse(memoryCart)
  parseCart.forEach((book) => {
    arrayCart.push(book)
    cart.innerHTML += `<div class="card mb-3">
            <img src="${book.img}" class="card-img-top" alt="${book.title}-cover">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${book.category}</h6>
                <p class="card-text">${book.price}$</p>
                <h6 class="card-subtitle mb-2 text-body-secondary mb-3">${book.asin}</h6>
            </div>
        </div>`
  })
  itemCartCount.innerText += parseCart.length
}

// Cancella il singolo linro
const deleteBook = function (e) {
  const singleBook = document.getElementById(`book-${e}`)
  singleBook.remove()
}
