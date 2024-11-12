const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./jokebooks.db');

db.serialize(() => {
  db.run("INSERT INTO categories (name) VALUES (?)", ['funnyJoke']);
  db.run("INSERT INTO categories (name) VALUES (?)", ['lameJoke']);

  db.run("INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)", [1, 'Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!']);
  db.run("INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)", [1, 'What kind of tree fits in your hand?', 'A palm tree']);
  db.run("INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)", [1, 'What is worse than raining cats and dogs?', 'Hailing taxis']);
  db.run("INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)", [2, 'Which bear is the most condescending?', 'Pan-DUH']);
  db.run("INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)", [2, 'What would the Terminator be called in his retirement?', 'The Exterminator']);
});

db.close(() => {
  console.log("Database populated successfully.");
});