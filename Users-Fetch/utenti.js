// Recuperiamo gli utenti da una API
// Application Programmin Interface
//  Le API sono dei "ponti di collegamento" che i backend metono a disposizione dei frontend

// Recuperiamo i nostri utenti da una API chiamata JSON placeholder ->https://jsonplaceholder.typicode.com/

// Per instaurare una HTTP request dalla nostra pagina, utilizzeremo un metodo chiamato fetch()
// che è lo standard per questo tipo di operazioni nei broswer
// fetch() torna una PROMISE con al suo interno la HTTP Response

// Utilizzo di fetch(url, options), servono 1o2 parametri per il suo funzionamento
// il parametro url è obbligatorio, corrisponde all'indirizzo da contattare
//  il parametro "options" è facoltativo -> serve per indicare delle opzioni avanzate

const getUsers = function () {
  fetch(
    "https://jsonplaceholder.typicode.com/users", //{
    // il secondo parametro è sempre facoltativo è sempre un oggetto ed è uno dei quattro metodi utilizzabili
    // GET: è una richiesta per ottenere informazioni dal server. Vado a leggere delle risorse
    // POST: Creo una risorsa che ancora non esiste (Un nuovo ordine su amazon)
    // PUT: Serve per modificare una risorsa esistente (Cambio password / Messaggio da modificare sui social / Cambiare il carrello di amazon)
    // PATCH
    // DELETE: Come dice il nome stesso, serve per eliminare una risorsa esistente
    // Method: "GET", può non essere dichiarato il GET perché è quello di defaul
    // Body: // è il JSON che voi inviate al server, si usa nel caso delle operazioni come POST ma non serve nel get
    // Headers: {
    // Serve per indicare altre cose specifiche al server come una chiave di autorizzazione
    // Authorization: XXXXXXXXX // una chiave specifica che fa entrare in API non gratuite
    // },
    // }
  )
    .then((response) => {
      console.log("response", response)
      // qui definisco quello che succede se la PROMISE va a buon fine E RIESCO A CONTATTARE IL SERVER
      // la PROMISE è RESOLVED, FULFILLED
      // Dentro response si trovano diverse informazioni come:
      // Lo status code (200 se è andato tutto bene)
      // La proprietà ok, che con un booleano ci restituisce l'esisto della promise
      // Questo oggetto però non contiente il JSON della risposta
      // Per estrarlo da questa response si può fare con un metodo che si chiama
      // response.json()
      // Il problema è che questo metodo a sua volta è asincrono e torna una PROMISE
      // e dobbiamo controllare se lo stato di ok è true oppure se ci ritorna 200
      if (response.ok) {
        // per essere sicuri che ci sia un JSON da estrarre devo essere sicuro che la chiamata
        // la chiamata sia andata a buon fine
        // qui possiamo estrarre il JSON con:
        return response.json() // dobbiamo ritornarlo, così come fetch ritorna una Promise
      } else {
        // qui ci possiamo finire se siamo riusciti a contattare il server
        // ma non abbiamo avuto la possilità di ricevere quello che volevamo perché ok è false
        // una cosa che si può fare per evitare troppi problemi è quella di RICICLARE il blocco catch
        // e di teletrasportarmi nel blocco catch
        throw new Error(`Risposta ricevuta, ma errore ${response.status}`)
      }
    })
    .then((data) => {
      // Qui ci ritornerà il JSON già "parsato" e quindi possiamo usare le informazioni
      // al suo interno come preferiamo
    })
    .catch((error) => {
      console.log(error)
      // Qui definisco cosa succede se la promise è NEGATIVA
      // la PROMISE è REJECTED
      // qui ci finosco se proprio NON RIESCO A CONTATTARE IL SERVER
    })
}
getUsers()
