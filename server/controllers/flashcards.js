const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');

const translationsUtils = require('../utils/translations');

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
        dictionaries = dictionaries.filter(l => l.key.length === 4 && l.languages.length === 2);
        dictionaries = dictionaries.map(l => l.key)

        res.status(200).json(dictionaries);
      });
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message);
    });
};

exports.postTranslation = (req, res, next) => {
  const dictionary = req.body.dictionary;
  const originalLang = req.body.originalLang;
  const word = req.body.word;

  const apiURL = `http://api.pons.com/v1/dictionary?q=${word}&l=${dictionary}&in=${originalLang}`;
  const APIKey = '11d75337f5d1fd7aa58e4145a283e9e1b30c96bffc4a385ec15b90a170ae7792';

  const options = {
    hostname: 'httpbin.org',
    path: '/get',
    headers: {
        Authorization: 'authKey'
    }
}

  http
    .get(apiURL, {headers: {'X-Secret': APIKey}}, (apiRes) => {
      let data = '';

      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      apiRes.on('end', () => {
        let translations = JSON.parse(data);
        translations = translationsUtils.parseTranslations(translations);

        let flashcard = {id: null, dictionary, originalLang, word, translations}

        res.status(200).json(flashcard);
      });
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message);
    });
};
