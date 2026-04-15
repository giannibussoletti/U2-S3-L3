const ul = document.getElementById("lista-utenti")

const getUsers = function () {
  fetch(
    "https://jsonplaceholder.typicode.com/users", //{
  )
    .then((response) => {
      console.log("response", response)

      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`Risposta ricevuta, ma errore ${response.status}`)
      }
    })
    .then((data) => {
      data.forEach((utenti) => {
        const li = document.createElement("li")
        li.innerText = utenti.name
        ul.appendChild(li)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
getUsers()
