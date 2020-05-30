import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { TranslationLanguagesPair } from 'src/app/shared/model/translation-languages-pair.model';
import { Flashcard } from 'src/app/shared/model/flashcard.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss'],
})
export class FlashcardsComponent implements OnInit {
  editMode: boolean;
  availableDictionaries: string[];
  availableTranslationLanguages: TranslationLanguagesPair[];
  originalLang: any;
  translationLang: any;
  availableTranslationLanguagesForGivenOrigin: string[];
  flashcards: Flashcard[];
  subscription: Subscription;

  form = new FormGroup({
    originalLang: new FormControl(),
    translationLang: new FormControl(),
  });

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
          this.search();
          this.form.setValue({
            originalLang: this.originalLang,
            translationLang: this.translationLang,
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  switchEditMode(event) {
    this.editMode = !this.editMode;
    event.target.classList.toggle('edit-checked');
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
    if (value === this.translationLang) {
      return;
    }
    this.translationLang = value;

    if (this.originalLang && this.translationLang) {
      this.search();
    }
  }

  search() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    const dictionary = this.flashcardService.getDictionaryName(
      this.availableDictionaries,
      this.originalLang,
      this.translationLang
    );
    this.subscription = this.flashcardService
      .getAllFlashcards(dictionary, this.originalLang)
      .subscribe((data) => {
        this.flashcards = data;
      });
  }

  navigateToFlashcardForm() {
    let state;
    if (this.originalLang && this.translationLang) {
      state = {
        originalLang: this.originalLang,
        translationLang: this.translationLang,
      };
    }
    this.router.navigate([`/flashcards/form`], {
      state,
    });
  }

  onDeleteFlashcard(event) {
    this.flashcardService.deleteFlashcard(event).subscribe(
      (data) => {
        this.flashcards = this.flashcards.filter((f) => f._id !== data._id);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
