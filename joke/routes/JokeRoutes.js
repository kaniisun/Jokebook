const express = require('express');
const router = express.Router();
const JokeController = require('../controllers/JokeController'); 

router.get('/categories', JokeController.getCategories);

router.get('/joke/:category', JokeController.getJokesByCategory);

router.post('/joke/new', JokeController.addJoke);

module.exports = router;