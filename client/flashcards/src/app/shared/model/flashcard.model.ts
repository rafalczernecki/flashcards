import { TranslationPair } from './translation-pair.model';

export interface Flashcard {
  _id: string;
  dictionary: string;
  originalLang: string;
  word: string;
  translations: TranslationPair[];
}
