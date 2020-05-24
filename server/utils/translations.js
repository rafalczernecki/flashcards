const htmlParser = require('html-parser');

exports.parseTranslations = (apiResponse) => {
    translations = [];

    apiResponse[0].hits.forEach((hit) => {
      hit.roms.forEach((rom) => {
        rom.arabs.forEach((arab) => {
          arab.translations.forEach((translation) => {
            let originalWord = '';
            let translatedWord = '';
            htmlParser.parse(translation.source, {
              text: function (value) {
                if (value.length > 1) {
                  originalWord += value.trim() + ' ';
                }
              },
            });
            originalWord = originalWord.trim();
            htmlParser.parse(translation.target, {
              text: function (value) {
                  translatedWord += value.trim() + ' ';
              },
            });
            translatedWord = translatedWord.trim();
            translations.push({originalWord, translatedWord});
          });
        });
      });
    });

    return translations;
}