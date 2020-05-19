const express = require('express');

const flashcardsController = require('../controllers/flashcards');

const router = express.Router();

router.post('/translation', flashcardsController.postTranslation);

module.exports = router;