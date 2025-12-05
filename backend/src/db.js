import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "../db/database.db");

export const db = new Database(dbPath);

// Path to migrations folder
const migrationsPath = path.join(__dirname, "../migrations");

// Ensure migrations table exists
db.exec(`
CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

console.log("✔ Migration tracking table ready");

// Read all migration files in sorted order
const migrationFiles = fs
    .readdirSync(migrationsPath)
    .filter(f => f.endsWith(".sql"))
    .sort();

// Apply migrations that have NOT yet been applied
migrationFiles.forEach(file => {
    const alreadyRun = db
        .prepare("SELECT 1 FROM migrations WHERE name = ?")
        .get(file);

    if (alreadyRun) {
        console.log(`↪ Skipping already applied migration: ${file}`);
        return; // Skip this migration
    }

    const sql = fs.readFileSync(path.join(migrationsPath, file), "utf8");

    try {
        db.exec(sql);
        db.prepare("INSERT INTO migrations (name) VALUES (?)").run(file);
        console.log(`✔ Applied migration: ${file}`);
    } catch (err) {
        console.error(`❌ Error applying migration ${file}:`, err.message);
        process.exit(1); // Stop server if migration fails
    }
});

console.log("✔ All migrations processed");
