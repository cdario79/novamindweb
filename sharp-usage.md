# Uso di Sharp per immagini responsive e ottimizzate

Questo documento spiega come installare e usare **Sharp** per convertire e ridimensionare automaticamente tutte le immagini `.jpg` presenti nella cartella `original/`, generando versioni **JPG**, **WebP** e **AVIF** per vari breakpoint e salvandole in `images/`.

---

## Prerequisiti

- **Node.js 18+** (consigliato 20+)
- **npm** o **pnpm/yarn**

Verifica versione:
```bash
node -v
npm -v
```

---

## Installazione

Installa Sharp come dipendenza del progetto:
```bash
npm install sharp
```
> Su macOS/Linux non servono pacchetti extra: Sharp scarica automaticamente **libvips** precompilata.

---

## Struttura delle cartelle

```
/original         # immagini sorgenti (JPG ad alta risoluzione)
/images           # output generato (verrà creato se non esiste)
resize.js
```

---

## Script di generazione (resize.js)

Esempio di script pronto all’uso. Salvalo come `resize.js` nella root del progetto.

```js
// resize.js
import sharp from "sharp";
import fs from "fs";
import path from "path";

async function generateResponsive() {
  const originalDir = "original";
  const outputDir = "images";
  const sizes = [320, 640, 1024, 1920];
  const formats = [
    { ext: "jpg",  format: "jpeg", options: { quality: 80, mozjpeg: true } },
    { ext: "webp", format: "webp", options: { quality: 80 } },
    { ext: "avif", format: "avif", options: { quality: 50 } },
  ];

  fs.mkdirSync(outputDir, { recursive: true });

  const files = fs.readdirSync(originalDir)
    .filter(f => f.toLowerCase().endsWith(".jpg"));

  for (const file of files) {
    const inputPath = path.join(originalDir, file);
    const baseName = path.parse(file).name;

    for (const width of sizes) {
      for (const fmt of formats) {
        const outputFile = path.join(outputDir, `${baseName}-${width}.${fmt.ext}`);
        await sharp(inputPath)
          .resize({ width })
          .toFormat(fmt.format, fmt.options)
          .toFile(outputFile);
        console.log(`✅ Generata ${outputFile}`);
      }
    }
  }

  console.log("🎉 Completato!");
}

generateResponsive().catch(err => {
  console.error("❌ Errore durante la generazione:", err);
  process.exit(1);
});
```

> **Nota:** Se usi CommonJS, sostituisci la prima riga con `const sharp = require("sharp");` e analogamente per `fs`/`path`.

---

## Comandi npm

Aggiungi al tuo `package.json`:
```json
{
  "scripts": {
    "resize": "node resize.js"
  }
}
```

Esegui:
```bash
npm run resize
```

---

## Come usare le immagini in HTML

### Variante con `<img>` e `srcset`
```html
<img
  src="/images/hero-640.webp"
  srcset="/images/hero-320.webp 320w,
          /images/hero-640.webp 640w,
          /images/hero-1024.webp 1024w,
          /images/hero-1920.webp 1920w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  width="1200"
  height="675"
  alt="Descrizione dell'immagine">
```

### Variante con `<picture>` e fallback
```html
<picture>
  <source type="image/avif" 
          srcset="/images/hero-320.avif 320w,
                  /images/hero-640.avif 640w,
                  /images/hero-1024.avif 1024w,
                  /images/hero-1920.avif 1920w">
  <source type="image/webp" 
          srcset="/images/hero-320.webp 320w,
                  /images/hero-640.webp 640w,
                  /images/hero-1024.webp 1024w,
                  /images/hero-1920.webp 1920w">
  <img
    src="/images/hero-640.jpg"
    srcset="/images/hero-320.jpg 320w,
            /images/hero-640.jpg 640w,
            /images/hero-1024.jpg 1024w,
            /images/hero-1920.jpg 1920w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
    width="1200"
    height="675"
    alt="Descrizione dell'immagine">
</picture>
```

---

## Consigli di qualità

- **AVIF**: qualità 45–55 di solito è un buon compromesso.
- **WebP**: qualità 75–85 per immagini fotografiche.
- **JPG (mozjpeg)**: prova 75–85; attiva `mozjpeg: true`.
- Evita di “upscalare”: se il sorgente è più piccolo del `width` richiesto, valuta di **saltare** quel taglio.
- Valuta un **naming** coerente, es: `nome-<larghezza>.<formato>` (già usato dallo script).

---

## Estensioni utili

- Supporto anche per `.png` o `.jpeg`: amplia il filtro dei file.
- Generazione **square/crop**:
  ```js
  .resize({ width, height: width, fit: "cover", position: "center" })
  ```
- Rimozione metadati EXIF:
  ```js
  .withMetadata({ orientation: undefined }) // o .toFormat(..., { effort: 4 })
  ```

---

## Troubleshooting

- **Errore di installazione Sharp**: aggiorna Node (`>=18`) e riprova `npm rebuild sharp`.
- **Binary/libvips non trovata**: assicurati che la rete non blocchi il download dei binari durante `npm install`.
- **Permessi su cartelle**: usa `fs.mkdirSync(outputDir, { recursive: true })` (già incluso) e controlla i path.

---

## Licenze & crediti

- **Sharp** è MIT. Vedi: https://github.com/lovell/sharp
- Verifica le **licenze** delle immagini sorgenti (Pexels, Freepik, Vecteezy, ecc.).

---

## TL;DR

1. `npm install sharp`
2. Metti le immagini in `original/`
3. `node resize.js` (o `npm run images`)
4. Usa `<picture>`/`srcset` per servire la dimensione e il formato migliore
