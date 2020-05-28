import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Flashcard } from 'src/app/shared/model/flashcard.model';
import { TranslationLanguagesPair } from 'src/app/shared/model/translation-languages-pair.model';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  private url = 'http://localhost:3000/flashcards';

  constructor(private http: HttpClient) {}

  getTranslation(dictionary, originalLang, word): Observable<Flashcard> {
    return this.http.post<Flashcard>(this.url + '/translation', {dictionary, originalLang, word});
  }

  getDictionaries(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/dictionaries');
  }

  saveFlashcard(flashcard): Observable<Flashcard> {
    return this.http.post<Flashcard>(this.url + '/save', {...flashcard});
  }

  getAllFlashcards(dictionary, originalLang) {
    return this.http.post<Flashcard[]>(this.url, {dictionary, originalLang});
  }

  getTranslationLanguagesPairs(dictionaries): TranslationLanguagesPair[] {
    const pairs = [];

    dictionaries.forEach((l) => {
      let firstLangAlreadyInArr = false;
      let secondLangAlreadyInArr = false;
      const firstLang = l.substring(0, 2);
      const secondLang = l.substring(2, 4);

      pairs.forEach((p) => {
        if (p.originalLang === firstLang) {
          p.availableTranslationLanguages.push(secondLang);
          firstLangAlreadyInArr = true;
        }
        if (p.originalLang === secondLang) {
          p.availableTranslationLanguages.push(firstLang);
          secondLangAlreadyInArr = true;
        }
      });

      if (!firstLangAlreadyInArr) {
        pairs.push({
          originalLang: firstLang,
          availableTranslationLanguages: [secondLang],
        });
      }
      if (!secondLangAlreadyInArr) {
        pairs.push({
          originalLang: secondLang,
          availableTranslationLanguages: [firstLang],
        });
      }
    });

    pairs.sort((p1, p2) => p1.originalLang.localeCompare(p2.originalLang));
    pairs.forEach(p => p.availableTranslationLanguages.sort());
    return pairs;
  }

  getDictionaryName(
    availableDictionaries,
    originalLang,
    translationLang
  ): string {
    let languagesCombination = (originalLang + translationLang).toLowerCase();


    let dictionary = availableDictionaries.find(d => d === languagesCombination);

    if (!dictionary) {
      languagesCombination = (translationLang + originalLang).toLowerCase();
      dictionary = availableDictionaries.find(d => d === languagesCombination);
    }

    return dictionary;
  }
}
