const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jokeRoutes = require('./routes/JokeRoutes'); 

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/jokebook', jokeRoutes); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});