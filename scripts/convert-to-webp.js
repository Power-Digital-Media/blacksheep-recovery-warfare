import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_DIR = path.join(__dirname, '../public');

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

async function convertToWebP() {
    console.log('Scanning for images to convert to WebP...');
    const allFiles = await getFiles(IMAGE_DIR);

    // Convert .png, .jpg, .jpeg
    const images = allFiles.filter(f => /\.(png|jpe?g)$/i.test(f));

    console.log(`Found ${images.length} images to convert.`);

    let totalSaved = 0;

    for (const file of images) {
        try {
            const dir = path.dirname(file);
            const ext = path.extname(file);
            const basename = path.basename(file, ext);
            const newFile = path.join(dir, basename + '.webp');

            const originalStats = await fs.promises.stat(file);

            await sharp(file)
                .webp({ quality: 80, effort: 6 })
                .toFile(newFile);

            const newStats = await fs.promises.stat(newFile);
            const saved = originalStats.size - newStats.size;

            // Only remove original if successful
            await fs.promises.unlink(file);

            totalSaved += saved;
            console.log(`✅ Converted ${basename}${ext} -> ${basename}.webp (Saved ${(saved / 1024 / 1024).toFixed(2)} MB)`);

        } catch (error) {
            console.error(`❌ Failed to convert ${path.basename(file)}:`, error.message);
        }
    }

    console.log(`\n🎉 Done! Total extra space saved via WebP: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

convertToWebP().catch(console.error);
