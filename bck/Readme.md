## Come l’ho realizzato

### Dove ho preso le icone
- La favicon l’ho generata con il sito https://realfavicongenerator.net/ seguendo i passaggi guidati.
- Le icone SVG le ho chieste a ChatGPT 5.0, che mi ha aiutato a crearle in modo semplice.

### Dove ho preso le imamgini
- Le immagini le ho scaricate da https://www.pexels.com/it-it/ e le ho modificate con GIMP in modo da rispettare le dimensioni del layout.
- Licenza per le immagini: https://www.pexels.com/it-it/license/
- https://www.freepik.com/
- https://www.vecteezy.com/  ATTIBUTION REQUIRED:  <a href="https://www.vecteezy.com/free-photos/web-analytics">Web Analytics Stock photos by Vecteezy</a>

### Dove ho preso il testo
- Il testo parte da una mia idea buttata giù come bozza e poi l'ho rielaborato e adattato con ChatGPT 5.0.

### Strumenti utilizzati
- https://www.freeformatter.com/html-formatter.html
- https://validator.w3.org/
- https://www.skynettechnologies.com/accessibility-checker


## Tool NPM utilizzati
- Come realizzare un server realistico per servire le pagine web: [live-server](live-server.usage.md)
- Come ridimensionare le immagine in modo comodo: [sharp](sharp-usage.md)


## Validazione HTML5 del Modulo di Contatto

Il form nella pagina Contatti del sito NovaMind Consulting utilizza la validazione nativa HTML5, senza bisogno di JavaScript. Questo permette al browser di controllare automaticamente che i campi siano compilati correttamente prima dell’invio.

🧩 Come funziona nel dettaglio

Ogni campo è stato configurato con attributi HTML specifici per validare i dati inseriti. Ecco come:

✏️ Campi obbligatori (required)

I seguenti campi sono obbligatori e devono essere compilati:
•	nome
•	cognome
•	email
•	messaggio
•	accettazione della Privacy Policy

Se uno di questi campi è vuoto, il browser blocca l’invio del form e mostra un messaggio automatico.

🔠 Regole di validazione per ciascun campo

Campo	Attributi di validazione	Spiegazione
Nome	required, minlength="2", maxlength="50", pattern	Solo lettere e spazi
Cognome	Come sopra
Email	required, type="email", maxlength="100"	Formato email valido obbligatorio
Telefono	pattern="[0-9+\s\-\(\)]+", maxlength="20"	Solo numeri, spazi, parentesi e segni +/-
Azienda	maxlength="100"	Campo facoltativo
Servizio	<select> opzionale	Nessuna validazione
Messaggio	required, minlength="10", maxlength="1000"	Deve contenere almeno 10 caratteri
Privacy Policy	required	Checkbox obbligatoria


⸻

🎨 Colori di bordo: come funziona il feedback visivo

I bordi rossi o verdi sui campi compilati dipendono dai pseudoselettori CSS :invalid e :valid, che reagiscono allo stato del campo.

Esempio CSS che puoi usare

.contact-form input:invalid,
.contact-form textarea:invalid,
.contact-form select:invalid {
border: 2px solid #e74c3c; /* Rosso errore */
}

.contact-form input:valid,
.contact-form textarea:valid,
.contact-form select:valid {
border: 2px solid #2ecc71; /* Verde corretto */
}

✅ Importante: perché un campo venga considerato :valid, deve rispettare tutti i vincoli (required, pattern, ecc.) e non essere vuoto.

⸻

💬 Esempio pratico: il campo “Nome”

<input type="text" id="nome" name="nome" required
minlength="2" maxlength="50"
pattern="[A-Za-zÀ-ÿ\s]+"
title="Inserisci solo lettere e spazi">

	•	✅ Se l’utente scrive Luca Rossi, il campo è valido → bordo verde
	•	❌ Se scrive 123 o lo lascia vuoto, il campo è invalido → bordo rosso

⸻

🛡️ Privacy e Newsletter

Il checkbox “Privacy Policy” è obbligatorio. Se non viene selezionato, il browser impedirà l’invio del form.

Il checkbox “Newsletter” invece è facoltativo e non influisce sulla validazione.







