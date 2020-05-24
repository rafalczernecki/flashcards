const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
  dictionary: {
    type: String,
    required: true,
  },
  originalLang: {
    type: String,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  translations: [
    {
      originalWord: String,
      translatedWord: String
    }
  ]
});

module.exports = mongoose.model('Flashcard', flashcardSchema);