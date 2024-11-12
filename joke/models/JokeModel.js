const db = require('../database/db');

exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT name FROM categories`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows.map(row => row.name));
    });
  });
};

exports.getJokesByCategory = (category, limit) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT id FROM categories WHERE name = ?`, [category], (err, row) => {
      if (err) return reject("Category not found");
      if (!row) return reject("Category not found");
      
      const categoryId = row.id;
      db.all(`SELECT setup, delivery FROM jokes WHERE category_id = ? LIMIT ?`, [categoryId, limit], (err, jokes) => {
        if (err) reject(err);
        else resolve(jokes);
      });
    });
  });
};

// add joke
exports.addJoke = (category, setup, delivery) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT id FROM categories WHERE name = ?`, [category], (err, row) => {
      if (err || !row) return reject("Invalid category");

      const categoryId = row.id;
      db.run(`INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)`, [categoryId, setup, delivery], function (err) {
        if (err) reject(err);
        else resolve({ setup, delivery });
      });
    });
  });
};