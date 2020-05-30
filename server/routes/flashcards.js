const express = require('express');
const { body } = require('express-validator');

const flashcardsController = require('../controllers/flashcards');

const router = express.Router();

router.get('/dictionaries', flashcardsController.getDictionaries);

router.post('/translation', flashcardsController.postTranslation);

router.post('/save', [
    body('dictionary').trim().isLength({min:4, max: 4}),
    body('originalLang').trim().isLength({min:2, max:2}),
    body('word').trim().isLength({min: 1, max: 30}),
    body('translations').isLength({min: 1, max: 50}).withMessage('At least one translation must be matched')
], flashcardsController.postSave);

router.post('', flashcardsController.postFlashcards);

module.exports = router;
