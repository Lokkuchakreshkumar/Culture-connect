import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';

async function run() {
    const db = await open({
        filename: './users.db',
        driver: sqlite3.Database
    });

    const tables = ['users', 'posts', 'likes', 'comments', 'events'];
    let output = '# Database Dump\n\n';

    for (let t of tables) {
        output += `## Table: ${t}\n\n`;
        try {
            const rows = await db.all(`SELECT * FROM ${t}`);
            if (rows.length === 0) {
                output += '*(empty)*\n\n';
                continue;
            }
            const keys = Object.keys(rows[0]);
            output += '| ' + keys.join(' | ') + ' |\n';
            output += '| ' + keys.map(() => '---').join(' | ') + ' |\n';
            
            for (const row of rows) {
                const values = keys.map(k => {
                    let val = row[k];
                    if (val === null) return 'null';
                    return String(val).replace(/\|/g, '\\|').replace(/\n/g, '<br>');
                });
                output += '| ' + values.join(' | ') + ' |\n';
            }
            output += '\n';
        } catch (e) {
            output += `Error reading table: ${e.message}\n\n`;
        }
    }
    
    fs.writeFileSync('./db_dump.md', output);
    console.log('Done');
}

run();
