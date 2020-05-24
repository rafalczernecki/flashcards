import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslationPair } from 'src/app/shared/model/translation-pair.model';
import { TranslationPairElement } from 'src/app/shared/model/translation-pair-element.model';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {

  @Input() value: TranslationPairElement;
  @Output() valueChanged: EventEmitter<TranslationPairElement> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  changeValue(event) {
    this.value.checked = event;
    this.valueChanged.emit(this.value);
  }

}
