// Fetching Refactoring

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
par.innerText = data[i].price

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

// libreria >
//   divCol >
//   divCard >
//   imgCover + divCardBody >
//   h5 + h6Category + par + h6Asin + btnCart + btnDelete

// Cart Refactoring

cartItemFunction(thisImg, thisTitle, thisPrice, thisCategory, thisAsin)
cartItemFunction(book.img, book.title, book.price, book.category, book.asin)

const cartItemFunction = function (img, title, price, category, asin) {
  const divColCart = document.createElement("div")
  // divCol.setAttribute("id", `book-${i}`)
  divCol.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-3")

  const divCardCart = document.createElement("div")
  divCardCart.classList.add("card")

  const imgCoverCart = document.createElement("img")
  imgCoverCart.classList.add("card-img-top")
  imgCoverCart.setAttribute("src", img)
  imgCoverCart.setAttribute("alt", `${title}-cover`)

  const divCardBodyCart = document.createElement("div")
  divCardBodyCart.classList.add("card-body")

  const h5CartTitle = document.createElement("h5")
  h5CartTitle.classList.add("card-title", "m-3")
  h5CartTitle.innerText = title

  const h6CategoryCart = document.createElement("h6")
  h6CategoryCart.classList.add("card-subtitle", "mb-2", "text-body-secondary", "mx-3")
  h6CategoryCart.innerText = category

  const parCart = document.createElement("p")
  parCart.classList.add("card-text", "mx-3")
  parCart.innerText = price

  const h6AsinCart = document.createElement("h6")
  h6AsinCart.classList.add("card-subtitle", "mb-4", "text-body-secondary", "mx-3")
  h6AsinCart.innerText = asin

  cart.appendChild(divColCart)
  divColCart.appendChild(divCardCart)
  divCardCart.appendChild(divCardBodyCart)
  divCardBodyCart.appendChild(imgCoverCart)
  divCardBodyCart.appendChild(h5CartTitle)
  divCardBodyCart.appendChild(h6CategoryCart)
  divCardBodyCart.appendChild(parCart)
  divCardBodyCart.appendChild(h6AsinCart)
}
//   const btnCartDelete = document.createElement("button")
//   btnCartDelete.classList.add("btn", "btn-danger")
//   btnCartDelete.setAttribute("onclick", `deleteCartBook(${e})`)
//   btnCartDelete.innerText = "Cancella"
