import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Flashcard } from 'src/app/shared/model/flashcard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
})
export class FlashcardComponent implements OnInit {
  @Input() flashcard: Flashcard;
  @Input() editMode: boolean;
  @Output() flashcardDeleted: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

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

  onEditFlashcard() {
    const state = {
      flashcard: this.flashcard,
    };

    this.router.navigate([`/flashcards/form`], {
      state,
    });
  }

  onDeleteFlashcard() {
    this.flashcardDeleted.emit(this.flashcard._id);
  }
}
