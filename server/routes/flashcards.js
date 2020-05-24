const express = require('express');

const flashcardsController = require('../controllers/flashcards');

const router = express.Router();

router.get('/dictionaries', flashcardsController.getDictionaries);

router.post('/translation', flashcardsController.postTranslation);

module.exports = router;