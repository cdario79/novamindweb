// This file uses the .mjs extension to explicitly signal to Node.js that it is an ECMAScript Module (ESM).
// This allows the use of modern 'import/export' syntax and top-level await without additional configuration.
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

// Source and (optional) output directory
const SRC = args.src ? String(args.src) : "dist";
const OUT = args.out ? String(args.out) : null; // e.g. --out=dist-min
const VERBOSE = args.verbose !== undefined;     // --verbose for extra logging

// Minifier options (equivalent to CLI flags)
const MINIFY_OPTS = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    useShortDoctype: true
    // Additional options can be added as needed:
    // removeAttributeQuotes: true,
    // removeEmptyAttributes: true,
};


// ---- Helpers --------------------------------------------------------------

/**
 * Recursively walks through a directory and yields all file paths.
 * 
 * @param {string} dir - The directory to start the walk from.
 * @yields {string} - The absolute path of each file found.
 */
async function* walk(dir) {
    for (const dirent of await fs.readdir(dir, { withFileTypes: true })) {
        const p = path.join(dir, dirent.name);
        if (dirent.isDirectory()) yield* walk(p);
        else yield p;
    }
}

/**
 * Ensures that the directory for a given file path exists.
 * If the directory doesn't exist, it creates it recursively.
 * 
 * @param {string} filePath - The path of the file for which the directory should be ensured.
 */
async function ensureDirForFile(filePath) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
}

/**
 * Formats a size in bytes into a human-readable string (B, KB, MB, GB).
 * 
 * @param {number} n - The size in bytes.
 * @returns {string} - The formatted string.
 */
function formatBytes(n) {
    if (n === 0) return "0 B";
    const k = 1024, units = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(n) / Math.log(k));
    return `${(n / Math.pow(k, i)).toFixed(i ? 2 : 0)} ${units[i]}`;
}

// ---- Main Execution --------------------------------------------------------

/**
 * Main self-invoking function that handles the minification process.
 * 1. Resolves source and output paths.
 * 2. Cleans and prepares the output directory if specified.
 * 3. Scans for HTML files in the source directory.
 * 4. Minifies each file found and writes it to the output destination.
 * 5. Logs progress and a final summary of space saved.
 */
(async () => {
    const srcAbs = path.resolve(__dirname, "..", SRC);
    const outAbs = OUT ? path.resolve(__dirname, "..", OUT) : null;

    if (OUT) {
        // Create an empty output directory the first time
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
        console.error("Error scanning directories:", e.message);
        process.exit(1);
    }

    if (files.length === 0) {
        console.log(`No .html files found in ${SRC}`);
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
          console.error(`✗ Parsing error in ${rel}: ${e.message}`);
          // If --fail is present, signal process error (exit code != 0) but continue on other files
          if (args.fail !== undefined) {
            process.exitCode = 1;
          }
          // Default mode: keep original (and copy to OUT if set), then move to next file
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
            console.log(`  → written to: ${path.relative(process.cwd(), outFile)}`);
        }
    }

    const savedTot = totalBefore - totalAfter;
    const pctTot = totalBefore ? ((savedTot / totalBefore) * 100).toFixed(1) : "0.0";
    console.log("");
    console.log("\n— Summary —");
    console.log(`Files: ${files.length}`);
    console.log(`Total: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}  (−${formatBytes(savedTot)} | ${pctTot}%)`);
})().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});