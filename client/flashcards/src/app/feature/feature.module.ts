import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardsComponent } from './flashcards/flashcards/flashcards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashcardFormComponent } from './flashcards/flashcard-form/flashcard-form.component';
import { TranslationsContainerComponent } from './flashcards/flashcard-form/translations-container/translations-container.component';
import { TranslationComponent } from './flashcards/flashcard-form/translations-container/translation/translation.component';


@NgModule({
  declarations: [
    FlashcardsComponent,
    FlashcardFormComponent,
    TranslationsContainerComponent,
    TranslationComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FlashcardsComponent],
})
export class FeatureModule {}
