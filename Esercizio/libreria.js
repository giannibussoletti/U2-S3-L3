const cartItemFunction = function (img, title, price, category, asin) {
  const divCardCart = document.createElement("div")
  divCardCart.classList.add("card")

  const imgCoverCart = document.createElement("img")
  imgCoverCart.classList.add("card-img-top")
  imgCoverCart.setAttribute("src", img)
  imgCoverCart.setAttribute("alt", `${title}-cover`)

  const divCardBodyCart = document.createElement("div")
  divCardBodyCart.classList.add("card-body")

  const h5CartTitle = document.createElement("h5")
  h5CartTitle.classList.add("card-title")
  h5CartTitle.innerText = title

  const h6CategoryCart = document.createElement("h6")
  h6CategoryCart.classList.add("card-subtitle", "mb-2", "text-body-secondary")
  h6CategoryCart.innerText = category

  const parCart = document.createElement("p")
  parCart.classList.add("card-text")
  parCart.innerText = price

  const h6AsinCart = document.createElement("h6")
  h6AsinCart.classList.add("card-subtitle", "mb-4", "text-body-secondary")
  h6AsinCart.innerText = asin

  cart.appendChild(divCardCart)
  divCardCart.appendChild(divCardBodyCart)
  divCardBodyCart.appendChild(imgCoverCart)
  divCardBodyCart.appendChild(h5CartTitle)
  divCardBodyCart.appendChild(h6CategoryCart)
  divCardBodyCart.appendChild(parCart)
  divCardBodyCart.appendChild(h6AsinCart)
}

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
        const divCol = document.createElement("div")
        divCol.setAttribute("id", `book-${i}`)
        divCol.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-3")

        const divCard = document.createElement("div")
        divCard.classList.add("card")

        const imgCover = document.createElement("img")
        imgCover.classList.add("book-img", "card-img-top")
        imgCover.setAttribute("src", `${data[i].img}`)

        const divCardBody = document.createElement("div")
        divCardBody.classList.add("card-body")

        const h5 = document.createElement("h5")
        h5.classList.add("card-title", "main-title")
        h5.innerText = data[i].title

        const h6Category = document.createElement("h6")
        h6Category.classList.add("book-category", "card-subtitle", "mb-2", "text-body-secondary")
        h6Category.innerText = data[i].category

        const par = document.createElement("p")
        par.classList.add("card-text", "price-tag")
        par.innerText = `${data[i].price}$`

        const h6Asin = document.createElement("h6")
        h6Asin.classList.add("book-asin", "card-subtitle", "mb-2", "text-body-secondary", "mb-3")

        const btnCart = document.createElement("button")
        btnCart.classList.add("btn", "btn-primary")
        btnCart.setAttribute("onclick", `addToCart(${i})`)
        btnCart.innerText = "Aggiungi al carello"

        const btnDelete = document.createElement("button")
        btnDelete.classList.add("btn", "btn-danger")
        btnDelete.setAttribute("onclick", `deleteBook(${i})`)
        btnDelete.innerText = "Scarta"

        divCol.appendChild(divCard)
        divCard.appendChild(imgCover)
        divCard.appendChild(divCardBody)
        divCardBody.appendChild(h5)
        divCardBody.appendChild(h6Category)
        divCardBody.appendChild(par)
        divCardBody.appendChild(h6Asin)
        divCardBody.appendChild(btnCart)
        divCardBody.appendChild(btnDelete)
        libreria.appendChild(divCol)
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

  localStorage.setItem("books", JSON.stringify(arrayCart))
  cartItemFunction(thisImg, thisTitle, thisPrice, thisCategory, thisAsin)
  itemCartCount.innerText = arrayCart.length
}

memoryCart = localStorage.getItem("books")

if (memoryCart) {
  const parseCart = JSON.parse(memoryCart)
  parseCart.forEach((book) => {
    arrayCart.push(book)
    cartItemFunction(book.img, book.title, book.price, book.category, book.asin)
  })
  itemCartCount.innerText += parseCart.length
}

// Cancella il singolo linro
const deleteBook = function (e) {
  const singleBook = document.getElementById(`book-${e}`)
  singleBook.remove()
}
