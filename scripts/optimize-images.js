const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, '../public/frames');

async function optimizeImages() {
  try {
    const files = await fs.promises.readdir(framesDir);
    const pngFiles = files.filter(f => f.endsWith('.png'));
    console.log(`Found ${pngFiles.length} PNG files to optimize.`);

    for (let i = 0; i < pngFiles.length; i++) {
      const file = pngFiles[i];
      const inputPath = path.join(framesDir, file);
      const outputPath = path.join(framesDir, file.replace('.png', '.webp'));

      try {
        await sharp(inputPath)
          .resize(800) // Resize width to 800px (retains aspect ratio)
          .webp({ quality: 80 }) // Convert to webp with quality 80
          .toFile(outputPath);
        
        console.log(`[${i + 1}/${pngFiles.length}] Optimized: ${file} -> webp`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
    console.log("Image optimization process finished successfully!");
  } catch (err) {
    console.error("Could not process directory:", err);
  }
}

optimizeImages();
