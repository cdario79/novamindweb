import sharp from "sharp"; // se usi ES Module
import fs from "fs";
import path from "path";

async function generateResponsive() {
    const originalDir = "assets/images";
    const outputDir = "images";
    const sizes = [320, 640, 1024, 1920];
    const formats = [
        { ext: "jpg", format: "jpeg", options: { quality: 80 } },
        { ext: "webp", format: "webp", options: { quality: 80 } },
        { ext: "avif", format: "avif", options: { quality: 50 } },
    ];

    // Assicurati che la cartella di output esista
    fs.mkdirSync(outputDir, { recursive: true });

    // Leggi tutti i file .jpg nella cartella original/
    const files = fs.readdirSync(originalDir).filter(f => f.toLowerCase().endsWith(".jpg"));

    for (const file of files) {
        const inputPath = path.join(originalDir, file);
        const baseName = path.parse(file).name;
        for (const width of sizes) {
            for (const fmt of formats) {
                const outputFile = path.join(
                    outputDir,
                    `${baseName}-${width}.${fmt.ext}`
                );
                await sharp(inputPath)
                    .resize({ width })
                    .toFormat(fmt.format, fmt.options)
                    .toFile(outputFile);
                console.log(`✅ Generata ${outputFile}`);
            }
        }
    }
}

generateResponsive().catch(console.error);