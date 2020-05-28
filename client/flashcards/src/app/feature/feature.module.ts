import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardsComponent } from './flashcards/flashcards/flashcards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashcardFormComponent } from './flashcards/flashcard-form/flashcard-form.component';
import { TranslationsContainerComponent } from './flashcards/flashcard-form/translations-container/translations-container.component';
import { TranslationComponent } from './flashcards/flashcard-form/translations-container/translation/translation.component';
import { FlashcardContainerComponent } from './flashcards/flashcards/flashcard-container/flashcard-container.component';
import { FlashcardComponent } from './flashcards/flashcards/flashcard-container/flashcard/flashcard.component';


@NgModule({
  declarations: [
    FlashcardsComponent,
    FlashcardFormComponent,
    TranslationsContainerComponent,
    TranslationComponent,
    FlashcardContainerComponent,
    FlashcardComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FlashcardsComponent],
})
export class FeatureModule {}
