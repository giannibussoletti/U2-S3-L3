const cartItemFunction = function (img, title, price, category, asin, booknmb) {
  const divColCart = document.createElement("div")
  divColCart.setAttribute("id", `cart-${booknmb}`)
  divColCart.classList.add("col-12", "col-sm-6", "mb-3")

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

  const btnDeleteCart = document.createElement("button")
  btnDeleteCart.classList.add("btn", "btn-danger")
  btnDeleteCart.setAttribute("onclick", `deleteCartBook(${booknmb})`)
  btnDeleteCart.innerText = "Elimina"

  cart.appendChild(divColCart)
  divColCart.appendChild(divCardCart)
  divCardCart.appendChild(divCardBodyCart)
  divCardBodyCart.appendChild(imgCoverCart)
  divCardBodyCart.appendChild(h5CartTitle)
  divCardBodyCart.appendChild(h6CategoryCart)
  divCardBodyCart.appendChild(parCart)
  divCardBodyCart.appendChild(h6AsinCart)
  divCardBodyCart.appendChild(btnDeleteCart)
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
        divCol.setAttribute("id", i)
        divCol.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-3")

        const divCard = document.createElement("div")
        divCard.classList.add("card", "h-100")

        const imgCover = document.createElement("img")
        imgCover.classList.add("book-img", "card-img-top")
        imgCover.setAttribute("src", `${data[i].img}`)

        const divCardBody = document.createElement("div")
        divCardBody.classList.add("card-body", "d-flex", "flex-column")

        const h5 = document.createElement("h5")
        h5.classList.add("card-title", "main-title", "flex-grow-1")
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
        btnCart.classList.add("btn", "btn-primary", "mb-3")
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

/* #region global variable  */
const bookTitle = document.getElementsByClassName("main-title")
const bookImg = document.getElementsByClassName("book-img")
const bookAsin = document.getElementsByClassName("book-asin")
const bookCategory = document.getElementsByClassName("book-category")
const bookPrice = document.getElementsByClassName("price-tag")
const cart = document.querySelector("#cartModal .modal-body .row")
const itemCartCount = document.getElementById("items-in-cart")
const arrayCart = []
const buttonTrashin = document.getElementById("svuota-carrello")
/* #endregion */

const addToCart = function (e) {
  /* #region  addToCart Const */
  const thisTitle = bookTitle[e].innerText
  const thisImg = bookImg[e].getAttribute("src")
  const thisAsin = bookAsin[e].innerText
  const thisCategory = bookCategory[e].innerText
  const thisPrice = bookPrice[e].innerText
  const idBook = document.getElementById(e)
  const thisID = idBook.getAttribute("id")
  /* #endregion */

  arrayCart.push({
    title: thisTitle,
    img: thisImg,
    asin: thisAsin,
    category: thisCategory,
    price: thisPrice,
    id: thisID,
  })
  buttonTrashin.classList.remove("disabled")
  buttonTrashin.removeAttribute("aria-disabled")

  localStorage.setItem("books", JSON.stringify(arrayCart))

  cartItemFunction(thisImg, thisTitle, thisPrice, thisCategory, thisAsin, thisID)

  itemCartCount.innerText = arrayCart.length
}

// Riempio la lista di libri nel carello ogni volta che la pagina viene ricaricata
memoryCart = localStorage.getItem("books")

if (memoryCart) {
  const parseCart = JSON.parse(memoryCart)
  parseCart.forEach((book) => {
    arrayCart.push(book)
    cartItemFunction(book.img, book.title, book.price, book.category, book.asin, book.id)
  })
  itemCartCount.innerText = parseCart.length
}

// controllo se il carrello è vuoto, in caso fosse vero, il bottone viene disabilitato
const disableSvuotaCarrello = function () {
  if (arrayCart.length === 0) {
    buttonTrashin.classList.add("disabled")
    buttonTrashin.setAttribute("aria-disabled", "true")
  }
}
disableSvuotaCarrello()

// Cancella il singolo libro dalla libreria
const deleteBook = function (e) {
  const singleBook = document.getElementById(e)
  singleBook.remove()
}

//Cancella il singolo libro dal carrello
const deleteCartBook = function (e) {
  const singleBookCart = document.getElementById(`cart-${e}`)
  const singleBookArray = document.querySelector(`#cart-${e} h5`).innerText
  singleBookCart.remove()
  arrayCart.forEach((bookDelete, index) => {
    if (singleBookArray === bookDelete.title) {
      arrayCart.splice(index, 1)
      localStorage.setItem("books", JSON.stringify(arrayCart))
      itemCartCount.innerText = arrayCart.length
      disableSvuotaCarrello()
    }
  })
}

// Svuota Carrello
const EmptyCart = function () {
  const TrashinCart = document.querySelector("#cartModal .row")
  TrashinCart.innerHTML = ""
  localStorage.setItem("books", "")
  itemCartCount.innerText = 0
  buttonTrashin.classList.add("disabled")
  buttonTrashin.setAttribute("aria-disabled", "true")
}
