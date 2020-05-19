import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardsComponent } from './flashcards/flashcards.component';



@NgModule({
  declarations: [FlashcardsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FlashcardsComponent
  ]
})
export class FeatureModule { }
