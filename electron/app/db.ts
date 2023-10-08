import path from "node:path";
const sqlite3 = require('sqlite3').verbose();
process.env.DIST = path.join(__dirname, '../dist');

export const db = () => {
    return new sqlite3.Database(`${process.env.DIST}/webnion.db`, (err: Error) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
}

