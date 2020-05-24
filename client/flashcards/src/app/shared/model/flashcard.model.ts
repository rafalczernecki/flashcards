import { TranslationPair } from './translation-pair.model';

export interface Flashcard {
  id: string;
  dictionary: string;
  originalLang: string;
  word: string;
  translations: TranslationPair[];
}
