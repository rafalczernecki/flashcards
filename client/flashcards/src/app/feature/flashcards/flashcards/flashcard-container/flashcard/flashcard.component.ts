import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Flashcard } from 'src/app/shared/model/flashcard.model';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
})
export class FlashcardComponent implements OnInit {
  @Input() flashcard: Flashcard;

  constructor() {}

  ngOnInit(): void {}

  onFlip(event) {
    if (event.target.className.includes('first-level-child')) {
      event.target.parentElement.parentElement.parentElement.classList.toggle(
        'hover'
      );
      return;
    }
    if (event.target.className.includes('second-level-child')) {
      event.target.parentElement.parentElement.parentElement.parentElement.classList.toggle(
        'hover'
      );
      return;
    }
    event.target.parentElement.parentElement.classList.toggle('hover');
  }
}
