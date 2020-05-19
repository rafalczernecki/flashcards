import { Component, OnInit } from '@angular/core';
import { FlashcardService } from './flashcard.service';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {

  constructor(private flashcardService: FlashcardService) { }

  ngOnInit(): void {
  }

}
