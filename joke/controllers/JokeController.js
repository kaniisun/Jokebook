const JokeModel = require('../models/JokeModel');

exports.getCategories = async (req, res) => {
  try {
    const categories = await JokeModel.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get categories" });
  }
};

exports.getJokesByCategory = async (req, res) => {
  const category = req.params.category;
  const limit = req.query.limit || 10;
  try {
    const jokes = await JokeModel.getJokesByCategory(category, limit);
    res.json(jokes);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.addJoke = async (req, res) => {
  const { category, setup, delivery } = req.body;
  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  try {
    await JokeModel.addJoke(category, setup, delivery);
    const updatedJokes = await JokeModel.getJokesByCategory(category, 10);
    res.json(updatedJokes);
  } catch (error) {
    res.status(400).json({ error });
  }
};