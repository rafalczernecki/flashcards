import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslationPairElement } from 'src/app/shared/model/translation-pair-element.model';
import { TranslationPair } from 'src/app/shared/model/translation-pair.model';

@Component({
  selector: 'app-translations-container',
  templateUrl: './translations-container.component.html',
  styleUrls: ['./translations-container.component.scss'],
})
export class TranslationsContainerComponent implements OnInit {
  @Input() translations: TranslationPairElement[];

  @Output() flashcardSaved: EventEmitter<
    TranslationPair[]
  > = new EventEmitter();

  @Output() flashcardCanceled: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onChildValueChange(event) {
    const transtlation = this.translations.find(
      (t) =>
        t.originalWord === event.originalWord &&
        t.translatedWord === event.translatedWord
    );
    transtlation.checked = event.checked;
  }

  onFlashcardSaved() {
    const translationPairs = [];
    this.translations.forEach((t) => {
      if (t.checked === true) {
        translationPairs.push({
          originalWord: t.originalWord,
          translatedWord: t.translatedWord,
        });
      }
    });
    this.flashcardSaved.emit(translationPairs);
  }

  onCancel() {
    this.flashcardCanceled.emit();
  }
}
