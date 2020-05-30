import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Flashcard } from 'src/app/shared/model/flashcard.model';

@Component({
  selector: 'app-flashcard-container',
  templateUrl: './flashcard-container.component.html',
  styleUrls: ['./flashcard-container.component.scss']
})
export class FlashcardContainerComponent implements OnInit {

  @Input() flashcards: Flashcard[];
  @Input() editMode: boolean;
  @Output() flashcardDeleted: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteFlashcard(event) {
    this.flashcardDeleted.emit(event);
  }
}
