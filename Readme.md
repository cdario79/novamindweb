## Come l’ho realizzato

### Dove ho preso le icone
- La favicon l’ho generata con il sito https://realfavicongenerator.net/ seguendo i passaggi guidati.
- Le icone SVG le ho chieste a ChatGPT 5.0, che mi ha aiutato a crearle in modo semplice.

### Dove ho preso le imamgini
- Le immagini le ho scaricate da https://www.pexels.com/it-it/ e le ho modificate con GIMP in modo da rispettare le dimensioni del layout.
- Licenza per le immagini: https://www.pexels.com/it-it/license/

### Dove ho preso il testo
- Il testo parte da una mia idea buttata giù come bozza e poi l'ho rielaborato e adattato con ChatGPT 5.0.

### Strumenti utilizzati
- https://www.freeformatter.com/html-formatter.html
- https://validator.w3.org/
- https://www.skynettechnologies.com/accessibility-checker

## Uso di npm e live-server

Volevo un modo facile per vedere il sito mentre lo modifico, senza dover aggiornare la pagina ogni volta. Ho usato Node.js con npm e il pacchetto live-server.

### Cosa serve prima
- Avere installato Node.js (npm è già incluso).

### Come ho installato le dipendenze
```shell script
npm install
```


### Come avvio il server di sviluppo
```shell script
npm run start
```

- Questo apre un server locale sulla porta 3000.
- Il browser si apre da solo su /index.html.
- Ogni volta che salvo un file, la pagina si ricarica automaticamente.

### Piccole note che mi sono utili
- Per fermare tutto: uso Ctrl + C nel terminale.
- Se la porta 3000 è occupata, chiudo il programma che la usa oppure cambio la porta nel comando di avvio.

### Perché ho scelto questo metodo
- Vedo subito le modifiche: con live-server non devo aggiornare a mano.
- È più “reale” rispetto ad aprire i file con doppio clic (file://), così non ho problemi con i percorsi.
- Non devo configurare quasi nulla: per un sito statico (HTML/CSS) funziona subito.
- Con npm ho un comando unico (“npm run start”) facile da ricordare e da far usare anche ad altri.
- Per condividere il progetto basta fare “npm install” e “npm run start” su un altro PC.

## Cosa sto costruendo

### Sito Web per una Startup di Consulenza Digitale
NovaMind Consulting è una giovane startup che offre servizi di consulenza digitale per PMI che desiderano accelerare il proprio percorso di trasformazione tecnologica. L'azienda ha bisogno di un sito web moderno, efficace e rappresentativo della sua identità innovativa per attrarre nuovi clienti e costruire una forte presenza online.

Il sito dovrà: 
- Comunicare in modo chiaro i servizi offerti e il valore aggiunto della consulenza digitale proposta. 
- Rafforzare la credibilità aziendale attraverso una sezione "Chi siamo" che presenti il team e i valori fondanti. 
- Creare una connessione continua con il pubblico tramite un blog aggiornato con articoli di approfondimento. 
- Facilitare il contatto diretto grazie a una pagina di contatto intuitiva con modulo per richieste.

Le pagine richieste sono:
- Una homepage con il nome dell'azienda e i servizi offerti
- Una pagina “Chi siamo” con il team e i valori aziendali
- Un blog per la condivisione di articoli
- Una pagina di contatto con un modulo per le richieste

I servizi, il team, i valori aziendali e alcuni articoli possono essere inventati da zero da te.

### Valore aggiunto del progetto
Questo progetto non solo contribuirà al posizionamento di NovaMind Consulting nel mercato competitivo della consulenza digitale, ma rappresenterà anche un esempio concreto di come un sito web ben progettato possa diventare uno strumento strategico di comunicazione e acquisizione clienti.

### Requisiti di alto livello
- Design responsive: il sito deve essere perfettamente fruibile su desktop, tablet e smartphone.
- Accessibilità: deve rispettare le linee guida principali per garantire l'accesso a tutti gli utenti.
- Ottimizzazione: le pagine devono caricarsi rapidamente e fornire un'esperienza utente fluida.
- Struttura chiara: la navigazione deve essere intuitiva e i contenuti facilmente reperibili.
- Cura della comunicazione: testi e immagini devono trasmettere professionalità, affidabilità e innovazione.
- Con questo progetto metterai in pratica tutte le competenze di sviluppo web acquisite, dimostrando la tua capacità di creare siti web completi, efficaci e orientati al business.







