import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Flashcard } from 'src/app/shared/model/flashcard.model';
import { FlashcardService } from '../flashcard.service';
import { TranslationLanguagesPair } from 'src/app/shared/model/translation-languages-pair.model';
import { TranslationPairElement } from 'src/app/shared/model/translation-pair-element.model';
import { TranslationPair } from 'src/app/shared/model/translation-pair.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcard-form',
  templateUrl: './flashcard-form.component.html',
  styleUrls: ['./flashcard-form.component.scss'],
})
export class FlashcardFormComponent implements OnInit {
  form = new FormGroup({
    originalLang: new FormControl('', [Validators.required]),
    translationLang: new FormControl('', [Validators.required]),
    word: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  availableDictionaries: string[];
  availableTranslationLanguages: TranslationLanguagesPair[] = undefined;
  originalLang: string;
  availableTranslationLanguagesForGivenOrigin: string[];
  translationLang: string;
  translationRequestSent: boolean;
  flashcard: Flashcard;
  translations: TranslationPairElement[];
  errorMessage: string;

  constructor(
    private flashcardService: FlashcardService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.originalLang = this.router.getCurrentNavigation().extras.state.originalLang;
      this.translationLang = this.router.getCurrentNavigation().extras.state.translationLang;
    }
  }

  ngOnInit(): void {
    this.flashcardService.getDictionaries().subscribe(
      (data) => {
        this.availableDictionaries = data;
        this.availableTranslationLanguages = this.flashcardService.getTranslationLanguagesPairs(
          data
        );
        if (this.originalLang && this.translationLang) {
          this.setAvailableTranslationLanguages(this.originalLang);
          this.form.setValue({originalLang: this.originalLang, translationLang: this.translationLang, word: ''});
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  originalLangSelected(value): void {
    this.originalLang = value;

    this.setAvailableTranslationLanguages(value);
  }

  setAvailableTranslationLanguages(originalLang) {
    const translationLangs = this.availableTranslationLanguages.find(
      (t) => t.originalLang === originalLang
    );

    if (translationLangs) {
      this.availableTranslationLanguagesForGivenOrigin =
        translationLangs.availableTranslationLanguages;
    }
  }

  translationLangSelected(value): void {
    this.translationLang = value;
  }

  translationFormSubmit() {
    this.translationRequestSent = true;

    const dictionary = this.flashcardService.getDictionaryName(
      this.availableDictionaries,
      this.originalLang,
      this.translationLang
    );

    this.flashcardService
      .getTranslation(
        dictionary,
        this.originalLang,
        this.form.controls.word.value
      )
      .subscribe(
        (data) => {
          this.flashcard = data;
          this.translations = [];
          data.translations.forEach((t) => {
            this.translations.push({ ...t, checked: false });
          });
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }

  onFlashcardSaved(event) {
    this.flashcard.translations = event;
    this.flashcardService.saveFlashcard(this.flashcard).subscribe((data) => {
      this.router.navigate([`/flashcards`], {
        state: {
          originalLang: this.flashcard.originalLang,
          translationLang: this.flashcard.dictionary.replace(
            this.flashcard.originalLang,
            ''
          ),
        },
      });
    });
  }

  onFlashcardCanceled() {
    this.translationRequestSent = false;
    this.flashcard = undefined;
    this.translations = undefined;
    this.errorMessage = undefined;
  }

  navigateToFlashcards() {
    let state;
    if (this.originalLang && this.translationLang) {
      state = {
        originalLang: this.originalLang,
        translationLang: this.translationLang,
      };
    }
    this.router.navigate([`/flashcards`], {
      state,
    });
  }
}
