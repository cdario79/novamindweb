// scripts/minify-html.mjs
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { minify } from "html-minifier-terser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- Config & CLI ---------------------------------------------------------
const args = Object.fromEntries(
    process.argv.slice(2).map(a => {
        const [k, v] = a.split("=");
        return [k.replace(/^--/, ""), v ?? true];
    })
);

// Sorgente e (opzionale) cartella di output
const SRC = args.src ? String(args.src) : "dist";
const OUT = args.out ? String(args.out) : null; // es. --out=dist-min
const VERBOSE = args.verbose !== undefined;     // --verbose per log extra

// Opzioni minifier (equivalenti ai tuoi flag CLI)
const MINIFY_OPTS = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    useShortDoctype: true
    // Aggiungibili all’occorrenza:
    // removeAttributeQuotes: true,
    // removeEmptyAttributes: true,
};


// ---- Helpers --------------------------------------------------------------
async function* walk(dir) {
    for (const dirent of await fs.readdir(dir, { withFileTypes: true })) {
        const p = path.join(dir, dirent.name);
        if (dirent.isDirectory()) yield* walk(p);
        else yield p;
    }
}

async function ensureDirForFile(filePath) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
}

function formatBytes(n) {
    if (n === 0) return "0 B";
    const k = 1024, units = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(n) / Math.log(k));
    return `${(n / Math.pow(k, i)).toFixed(i ? 2 : 0)} ${units[i]}`;
}

// ---- Main -----------------------------------------------------------------
(async () => {
    const srcAbs = path.resolve(__dirname, "..", SRC);
    const outAbs = OUT ? path.resolve(__dirname, "..", OUT) : null;

    if (OUT) {
        // crea cartella di output vuota la prima volta
        await fs.rm(outAbs, { recursive: true, force: true });
        await fs.mkdir(outAbs, { recursive: true });
    }

    let files = [];
    try {
        for await (const f of walk(srcAbs)) {
            if (f.toLowerCase().endsWith(".html") && !f.toLowerCase().endsWith(".min.html")) {
                files.push(f);
            }
        }
    } catch (e) {
        console.error("Errore nella scansione cartelle:", e.message);
        process.exit(1);
    }

    if (files.length === 0) {
        console.log(`Nessun file .html trovato in ${SRC}`);
        process.exit(0);
    }

    let totalBefore = 0;
    let totalAfter = 0;

    for (const inFile of files) {
        const rel = path.relative(srcAbs, inFile);
        const outFile = outAbs ? path.join(outAbs, rel) : inFile;

        const beforeStat = await fs.stat(inFile).catch(() => null);
        const before = beforeStat?.size ?? 0;

        const html = await fs.readFile(inFile, "utf8");
        let minified;
        try {
          minified = await minify(html, MINIFY_OPTS);
        } catch (e) {
          console.error(`✗ Errore di parsing in ${rel}: ${e.message}`);
          // Se presente --fail, segnala errore sul processo (exit code != 0) ma continua sugli altri file
          if (args.fail !== undefined) {
            process.exitCode = 1;
          }
          // In modalità default: mantieni l'originale (e copia in OUT se impostato), poi passa al prossimo file
          if (outAbs) {
            await ensureDirForFile(outFile);
            await fs.writeFile(outFile, html, "utf8");
          }
          totalBefore += before;
          totalAfter += before;
          console.log(`• ${rel}  ${formatBytes(before)} → ${formatBytes(before)}  (0 B | 0.0%) [SKIP]`);
          continue;
        }

        await ensureDirForFile(outFile);
        await fs.writeFile(outFile, minified, "utf8");

        const afterStat = await fs.stat(outFile).catch(() => null);
        const after = afterStat?.size ?? 0;

        totalBefore += before;
        totalAfter += after;

        const saved = before - after;
        const pct = before ? ((saved / before) * 100).toFixed(1) : "0.0";

        console.log(`✓ ${rel}  ${formatBytes(before)} → ${formatBytes(after)}  (−${formatBytes(saved)} | ${pct}%)`);
        if (VERBOSE && OUT) {
            console.log(`  → scritto in: ${path.relative(process.cwd(), outFile)}`);
        }
    }

    const savedTot = totalBefore - totalAfter;
    const pctTot = totalBefore ? ((savedTot / totalBefore) * 100).toFixed(1) : "0.0";
    console.log("");
    console.log("\n— Riepilogo —");
    console.log(`File: ${files.length}`);
    console.log(`Totale: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}  (−${formatBytes(savedTot)} | ${pctTot}%)`);
})().catch(err => {
    console.error("Errore:", err);
    process.exit(1);
});