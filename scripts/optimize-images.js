import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_DIR = path.join(__dirname, '../public/images');

async function getFiles(dir) {
    let results = [];
    const list = await fs.promises.readdir(dir);

    for (let file of list) {
        file = path.join(dir, file);
        const stat = await fs.promises.stat(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(await getFiles(file));
        } else {
            results.push(file);
        }
    }
    return results;
}

async function optimizeImages() {
    console.log('Scanning for images...');
    const allFiles = await getFiles(IMAGE_DIR);
    const images = allFiles.filter(f => /\.(png|jpe?g)$/i.test(f));

    console.log(`Found ${images.length} images to optimize.`);

    let totalSaved = 0;

    for (const file of images) {
        const tempFile = file + '.tmp';
        const originalStats = await fs.promises.stat(file);

        try {
            const isPng = /\.png$/i.test(file);

            // Perform the optimization
            if (isPng) {
                await sharp(file)
                    .png({ quality: 80, compressionLevel: 9, palette: true })
                    .toFile(tempFile);
            } else {
                await sharp(file)
                    .jpeg({ quality: 80, mozjpeg: true })
                    .toFile(tempFile);
            }

            const newStats = await fs.promises.stat(tempFile);
            const saved = originalStats.size - newStats.size;

            // Only swap if we actually saved space
            if (saved > 0) {
                await fs.promises.unlink(file);
                await fs.promises.rename(tempFile, file);
                totalSaved += saved;
                console.log(`✅ Optimized ${path.basename(file)} (Saved ${(saved / 1024 / 1024).toFixed(2)} MB)`);
            } else {
                // If the optimized version is larger or the same, just keep the original
                await fs.promises.unlink(tempFile);
                console.log(`⏩ Skipped ${path.basename(file)} (Already optimized)`);
            }

        } catch (error) {
            console.error(`❌ Failed to optimize ${path.basename(file)}:`, error.message);
            // Clean up temp file if something went wrong
            if (fs.existsSync(tempFile)) {
                await fs.promises.unlink(tempFile);
            }
        }
    }

    console.log(`\n🎉 Done! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages().catch(console.error);
