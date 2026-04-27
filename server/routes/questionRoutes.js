const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions (with optional category or company filter)
router.get('/', async (req, res) => {
  try {
    const { category, company } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    if (company) {
      query.company = company;
    }
    const questions = await Question.find(query).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a question
router.post('/', async (req, res) => {
  const question = new Question({
    title: req.body.title,
    category: req.body.category,
    company: req.body.company,
    difficulty: req.body.difficulty,
    content: req.body.content
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a question
router.put('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    if (req.body.title) question.title = req.body.title;
    if (req.body.category) question.category = req.body.category;
    if (req.body.company) question.company = req.body.company;
    if (req.body.difficulty) question.difficulty = req.body.difficulty;
    if (req.body.content) question.content = req.body.content;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a question
router.delete('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    await question.deleteOne();
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
