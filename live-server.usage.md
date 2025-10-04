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