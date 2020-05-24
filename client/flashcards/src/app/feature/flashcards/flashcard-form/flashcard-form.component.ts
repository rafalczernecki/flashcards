import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Flashcard } from 'src/app/shared/model/flashcard.model';
import { FlashcardService } from '../flashcard.service';
import { TranslationLanguagesPair } from 'src/app/shared/model/translation-languages-pair.model';
import { TranslationPairElement } from 'src/app/shared/model/translation-pair-element.model';
import { TranslationPair } from 'src/app/shared/model/translation-pair.model';

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

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.flashcardService.getDictionaries().subscribe(
      (data) => {
        this.availableDictionaries = data;
        this.availableTranslationLanguages = this.flashcardService.getTranslationLanguagesPairs(
          data
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  originalLangSelected(value): void {
    this.originalLang = value;
    if (value === this.translationLang) {
      this.translationLang = null;
    }

    const translationLangs = this.availableTranslationLanguages.find(
      (t) => t.originalLang === value
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
      .subscribe(data => {
        this.flashcard = data;
        this.translations = [];
        data.translations.forEach((t) => {
          this.translations.push({ ...t, checked: false });
        });
      },
      error => {
        this.errorMessage = error.error.message;
      });
  }

  onFlashcardSaved(event) {
    this.flashcard.translations = event;
    this.flashcardService.saveFlashcard(this.flashcard).subscribe((data) => {
      //TODO: redirect to main page
    });
  }

  onFlashcardCanceled() {
    this.translationRequestSent = false;
    this.flashcard = undefined;
    this.translations = undefined;
    this.errorMessage = undefined;
  }
}
