const express = require('express');

const flashcardsController = require('../controllers/flashcards');

const router = express.Router();

router.get('/dictionaries', flashcardsController.getDictionaries);

module.exports = router;