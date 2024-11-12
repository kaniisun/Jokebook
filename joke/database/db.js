const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./jokebooks.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS jokes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    setup TEXT,
    delivery TEXT,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  )`);
});

module.exports = db;