// Iniziamo a alvorare con contenuti verametne dinamici. come ad esempio
// informazioni meteo, risultati partite, fedd amici sui social

const { Const } = require("three/tsl")

// Queste informazioni vengono recuperate tra noi che siamo il CLIENT
// e l'esterno che sono i SERVER, tramite protocollo HTTP
// Questa comunicazione avviene tramite un CLIENT che, attraverso un "HTTP REQUEST"
// va a contattare un SERVER. Il SERVER se riceve correttamente la nostra richiesta
// può decidere di rispondere con una HTTP RESPONSE. Questa response potrebbe veicolare
// i dati di cui la mia pagina ha bisogno.

// Il problema di questa operazione REQUESTE <->RESPONSE non è un'operazione ISTANTANEA.
// non è una operazione SINCRONA.

const x = "Gianni"
console.log(x)
// in JS l'assegnazione di una variabile è una operazione SINCRONA
// la variabile x alla riga 18 esiste

// Tutte le richieste HTTP sono ASINCRONE

// js, nell'esecuzione delle sue operazioni segue un modello di EVENT LOOP:
// le operazioni vegono eseguitea una alla volta secondo una metologia I/O NON BLOCCANTE.

// Quindi noi lanceremo le nostre HTTP REQUEST  per ottenere dati dall'esterno, a cui
// sperabilmente corrisponderanno delle HTTP RESPONSE (dal server) ma non sappiamo se e in quanto tempo!

// Dobbiamo istruire JS a creare una struttura in grado di aspettare il termine di questa operazione asincrona
// Senza freezare tutto il resto e in grado di AVVISARCI se e quando la response è arrivata!

// La metodologia più MODERNA per gestire queste operazioni asincrone in JS è un oggetto
// che si chiama "PROMISE".
// Un promise è una "promessa" che la mia operazione asincrona PRIMA O POI FINIRÀ.
// (con risultato positivo/negativo, in un tot tempo...)
// il risultato della Promise può contenere notizie "buone" o "cattive"; noi dovremmo per OGNI PROMISE
// definire i due "finali del film": dovremo definire cosa fare in caso di "Promise FULFILLED", oppure
// in caso di "Promise REJECTED". Lo stato di "attesa" tra il lancio della Promise e
// uno dei due finali viene detto "Promise PENDING"
// Pe capire in quale finale siamo capitati, se in quello buono o in quello ccattivo una Promise
// ci fornisce DUE blocchi di codice, uno denominato "then" -> se si finisce in questo blocco
// l'operazione è andata buon fine
// esiste per ogni Promis anche un altro blocco, denominato "catch" -> questo è quando l'operazione
// non va a buon fine e il "catch" va a prendere l'errore
