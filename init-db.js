import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUrl = process.env.DATABASE_URL;

if (dbUrl && dbUrl.startsWith('file:')) {
    // Extract the path from the URL
    // e.g. file:/opt/render/project/src/data/dev.db
    let targetPath = dbUrl.replace('file:', '');
    
    // On Linux/Render, it usually starts with /opt/
    // Let's ensure it's absolute if it starts with /
    if (targetPath.startsWith('//')) targetPath = targetPath.substring(2);
    
    const initDbPath = path.join(__dirname, 'init.db');
    
    if (fs.existsSync(initDbPath)) {
        let shouldCopy = false;
        
        if (!fs.existsSync(targetPath)) {
            shouldCopy = true;
        } else {
            const stats = fs.statSync(targetPath);
            const initStats = fs.statSync(initDbPath);
            // If the database is significantly smaller than the seed (empty schema) OR we force it
            if (stats.size < 50000 || process.env.FORCE_DB_RESET === 'true' || process.env.FORCE_DB_RESET === '1') {
                console.log('Existing database is empty or FORCE_DB_RESET is set. Overwriting with initial data...');
                shouldCopy = true;
            }
        }
        
        if (shouldCopy) {
            console.log(`Copying initial database to persistent disk at ${targetPath}...`);
            
            // Ensure target directory exists
            const targetDir = path.dirname(targetPath);
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }
            
            fs.copyFileSync(initDbPath, targetPath);
            console.log('Database copied successfully!');
        } else {
            console.log(`Persistent database already exists with data at ${targetPath}. Skipping copy.`);
        }
    } else {
        console.log('No init.db found to copy.');
    }
}
