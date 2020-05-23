const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');

const dictionariesParse = require('../utils/dictionaries-parse');

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
