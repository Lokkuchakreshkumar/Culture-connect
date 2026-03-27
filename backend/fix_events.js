import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function fix() {
    const dbPath = path.resolve('c:/Users/kumar/projects/Culture-connect/backend/users.db');
    const db = await open({ filename: dbPath, driver: sqlite3.Database });

    // Change all BookMyShow events to CultureConnect
    await db.run("UPDATE events SET username = 'CultureConnect' WHERE username = 'BookMyShow'");

    // Cap all prices to budget-friendly (max ₹499)
    await db.run("UPDATE events SET price = 299 WHERE price > 499 AND price <= 999");
    await db.run("UPDATE events SET price = 399 WHERE price > 999 AND price <= 2000");
    await db.run("UPDATE events SET price = 499 WHERE price > 2000");

    await db.close();
    console.log('Done - removed BookMyShow branding, prices made budget-friendly.');
}
fix().catch(console.error);
