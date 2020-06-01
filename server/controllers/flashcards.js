const http = require('http');
const { validationResult } = require('express-validator');

const translationsUtils = require('../utils/translations');
const Flashcard = require('../model/flashcard');

const APIKey =
  '11d75337f5d1fd7aa58e4145a283e9e1b30c96bffc4a385ec15b90a170ae7792';

exports.getDictionaries = (req, res, next) => {
  const lang = 'en';
  const apiURL = `http://api.pons.com/v1/dictionaries?language=${lang}`;

    http
    .get(apiURL, (apiRes) => {
      let data = '';

      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      apiRes.on('end', () => {
        let dictionaries = JSON.parse(data);
        dictionaries = dictionaries.filter(
          (l) => l.key.length === 4 && l.languages.length === 2
        );
        dictionaries = dictionaries.map((l) => l.key);

        res.status(200).json(dictionaries);
      });

    })
    .on('error', (err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postTranslation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed', errors: errors.array() });
  }

  const dictionary = req.body.dictionary;
  const originalLang = req.body.originalLang;
  const word = req.body.word;

  const apiURL = `http://api.pons.com/v1/dictionary?q=${word}&l=${dictionary}&in=${originalLang}`;

  http
    .get(apiURL, { headers: { 'X-Secret': APIKey } }, (apiRes) => {
      let data = '';

      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      apiRes.on('end', () => {
        if (!data.length) {
          res.status(404).json({ message: 'No translations found' });
        }

        let translations = JSON.parse(data);
        translations = translationsUtils.parseTranslations(translations);

        let flashcard = {
          id: null,
          dictionary,
          originalLang,
          word,
          translations,
        };

        res.status(200).json(flashcard);
      });
    })
    .on('error', (err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postSave = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed', errors: errors.array() });
  }

  const id = req.body._id;
  const dictionary = req.body.dictionary;
  const originalLang = req.body.originalLang;
  const word = req.body.word;
  const translations = req.body.translations;

  if (id) {
    Flashcard.findById(id)
      .then((flashcard) => {
        flashcard.translations = translations;
        flashcard
          .save()
          .then((result) => {
            res.status(201).json({
              result,
            });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  } else {
    const flashcardSchema = new Flashcard({
      dictionary: dictionary,
      originalLang: originalLang,
      word: word,
      translations: translations,
    });

    flashcardSchema
      .save()
      .then((result) => {
        res.status(201).json({
          result,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
};

exports.postFlashcards = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed', errors: errors.array() });
  }

  const dictionary = req.body.dictionary;
  const originalLang = req.body.originalLang;

  if (!dictionary || !originalLang) {
    const error = new Error('Invalid input');
    error.statusCode = 400;
    throw error;
  }

  Flashcard.find({ dictionary: dictionary, originalLang: originalLang })
    .then((flashcards) => {
      res.status(200).json(flashcards);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteFlashcard = (req, res, next) => {
  const flashcardId = req.body.flashcardId;
  if (!flashcardId) {
    const error = new Error('Missing id of flashcard to delete.');
    error.statusCode = 400;
    throw error;
  }

  Flashcard.findByIdAndRemove(flashcardId)
    .then((result) => {
      if (!result) {
        const error = new Error('A flashcard with this id could not be found.');
        error.statusCode = 404;
        next(error);
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
