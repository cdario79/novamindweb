import sharp from "sharp"; // Image processing library
import fs from "fs";
import path from "path";

/**
 * Automatically generates responsive images in multiple sizes and formats (JPG, WebP, AVIF).
 * This script reads all .jpg files from 'original_images' and outputs optimized versions 
 * to 'src/assets/images'.
 */
async function generateResponsive() {
    // Configuration: Input and output directories
    const originalDir = "original_images";
    const outputDir = "src/assets/images";
    
    // Target widths for responsive versions
    const sizes = [360, 504, 720, 960, 1024, 1200];
    
    // Target formats and their respective quality settings
    const formats = [
        { ext: "jpg", format: "jpeg", options: { quality: 75 } },
        { ext: "webp", format: "webp", options: { quality: 75 } },
        { ext: "avif", format: "avif", options: { quality: 45 } },
    ];

    // Ensure the output directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Read all .jpg files from the source directory
    const files = fs.readdirSync(originalDir).filter(f => f.toLowerCase().endsWith(".jpg"));

    // Process each image file
    for (const file of files) {
        const inputPath = path.join(originalDir, file);
        const baseName = path.parse(file).name;
        
        // Loop through each size and format to generate optimized variants
        for (const width of sizes) {
            for (const fmt of formats) {
                const outputFile = path.join(
                    outputDir,
                    `${baseName}-${width}.${fmt.ext}`
                );
                
                // Use sharp to resize and convert the image
                await sharp(inputPath)
                    .resize({ width }) // Resize to specified width maintaining aspect ratio
                    .toFormat(fmt.format, fmt.options) // Convert to target format with quality options
                    .toFile(outputFile); // Save the result
                
                console.log(`✅ Generated ${outputFile}`);
            }
        }
    }
}

// Execute the function and catch any errors
generateResponsive().catch(console.error);