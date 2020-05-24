import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlashcardFormComponent } from './flashcards/flashcard-form/flashcard-form.component';

const routes: Routes = [
    { path: 'form', component: FlashcardFormComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
