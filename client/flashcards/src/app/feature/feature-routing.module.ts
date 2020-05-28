import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlashcardFormComponent } from './flashcards/flashcard-form/flashcard-form.component';
import { FlashcardsComponent } from './flashcards/flashcards/flashcards.component';

const routes: Routes = [
    { path: 'form', component: FlashcardFormComponent },
    { path: '', component: FlashcardsComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
