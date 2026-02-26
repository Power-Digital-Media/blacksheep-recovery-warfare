import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src');
const ROOT_DIR = path.join(__dirname, '..');

async function getFiles(dir) {
    let results = [];
    const list = await fs.promises.readdir(dir);
    for (let file of list) {
        file = path.join(dir, file);
        const stat = await fs.promises.stat(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(await getFiles(file));
        } else {
            if (/\.(jsx?|css|html)$/.test(file)) {
                results.push(file);
            }
        }
    }
    return results;
}

async function updateReferences() {
    const files = await getFiles(SRC_DIR);
    // Also include index.html
    files.push(path.join(ROOT_DIR, 'index.html'));

    let updatedCount = 0;

    for (const file of files) {
        const content = await fs.promises.readFile(file, 'utf8');
        // Simple regex to replace .png and .jpg strings in src attrs, css urls, etc.
        // We only want to replace images we converted.
        // The regex replaces .png and .jpg followed by quotes, backticks, or question marks (query params).
        const newContent = content.replace(/\.(png|jpg|jpeg)(['"`\)])/ig, '.webp$2');

        if (content !== newContent) {
            await fs.promises.writeFile(file, newContent, 'utf8');
            console.log(`Updated references in ${path.basename(file)}`);
            updatedCount++;
        }
    }

    console.log(`Done! Updated ${updatedCount} files.`);
}

updateReferences().catch(console.error);
