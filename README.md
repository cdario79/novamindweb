# NovaMind Consulting - Sito Web Aziendale

Questo progetto è un sito web moderno e professionale realizzato per **NovaMind Consulting**, una startup di consulenza digitale per PMI.

È stato sviluppato come progetto finale per un corso di sviluppo web, mettendo in pratica competenze di design responsive, accessibilità e ottimizzazione delle prestazioni.

## Obiettivi del Progetto

L'obiettivo principale è comunicare l'identità innovativa di NovaMind e attrarre nuovi clienti attraverso:
- Una chiara esposizione dei servizi offerti.
- La costruzione di credibilità tramite la sezione "Chi siamo" e il team.
- La condivisione di valore attraverso un blog aggiornato.
- Un punto di contatto diretto e intuitivo.

## Struttura del Sito

Il sito è composto dalle seguenti pagine:
- **Homepage**: Presentazione dell'azienda e dei servizi principali (Consulenza IT, Digital Marketing, BI, Trasformazione Processi).
- **Chi Siamo**: Approfondimento sulla storia, i valori aziendali e presentazione del team di esperti.
- **Blog**: Indice degli articoli e pagine singole con approfondimenti tecnologici.
- **Contatti**: Modulo di richiesta informazioni con validazione nativa e dati di contatto.

## Stack Tecnologico e Strumenti

### Frontend
- **HTML5**: Struttura semantica per una migliore SEO e accessibilità.
- **CSS3**: Layout basato su Flexbox e CSS Grid, con utilizzo di variabili per un tema coerente.
- **SVG**: Icone leggere e scalabili create su misura.

### Workflow e Ottimizzazione
- **Node.js & NPM**: Gestione delle dipendenze di sviluppo e degli script di automazione.
- **Sharp**: Utilizzato per generare immagini responsive in formati moderni (**AVIF**, **WebP**) e ridimensionarle per i vari breakpoint.
- **Live-Server**: Utilizzato durante lo sviluppo per il ricaricamento automatico della pagina.
- **Clean-CSS & PurgeCSS**: Per la minificazione e l'ottimizzazione del codice CSS finale.
- **HTML-Minifier**: Per ridurre le dimensioni dei file HTML in produzione.

### Script in Javascript
- Gli script per minimizzare html e ottimizzare le immagini gli ho generati tramite prompt con un sistema di intelligenza artificiale.

## Gestione Immagini e Icone

- **Icone**: Favicon generata con [RealFaviconGenerator](https://realfavicongenerator.net/). Icone SVG progettate per essere accessibili e leggere.
- **Immagini**: Reperite da fonti come Pexels, Freepik e Vecteezy. Modificate con GIMP e successivamente processate con uno script basato su **Sharp** per garantire tempi di caricamento minimi senza perdita di qualità visibile.

## Creazione dei Testi
- I testi sono stati creati partendo da una mia idea e migliorati ed estesi con il supporto di strumenti di intelligenza artificiale.

## Validazione del Modulo di Contatto

Il modulo nella pagina Contatti utilizza la **validazione nativa HTML5**, garantendo un'esperienza utente fluida senza dipendere da script esterni:
- **Campi obbligatori**: Nome, Cognome, Email, Messaggio e Consenso Privacy.
- **Vincoli specifici**: Pattern Regex per validare nomi e numeri di telefono, lunghezze minime/massime per i messaggi.
- **Feedback Visivo**: Utilizzo dei pseudoselettori CSS `:invalid` e `:valid` per fornire feedback immediato all'utente (bordi verdi/rossi).

## Come avviare il progetto

### Prerequisiti
- [Node.js](https://nodejs.org/) (versione 18 o superiore consigliata)

### Installazione
1. Clona il repository o scarica i file.
2. Apri il terminale nella cartella del progetto.
3. Installa le dipendenze:
   ```bash
   npm install
   ```

### Sviluppo
Per avviare il server di sviluppo con ricaricamento automatico:
```bash
npm run dev
```

### Produzione (Build)
Per generare la versione ottimizzata del sito nella cartella `dist/`:
```bash
npm run build
```
Per visualizzare la versione finale (dist):
```bash
npm start
```

## Accessibilità e Qualità
Il sito è stato verificato con:
- [W3C HTML Validator](https://validator.w3.org/)
- Strumenti di verifica dell'accessibilità per garantire la fruibilità a tutti gli utenti.
- Ottimizzazione SEO tramite meta tag descrittivi e struttura semantica.

---
*Progetto realizzato da Colombo Dario - Dicembre 2025*
