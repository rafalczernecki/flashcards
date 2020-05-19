import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { FlashcardService } from './flashcard.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';

describe('FlashcardService', () => {
  let injector: TestBed;
  let httpClient: HttpClient;
  let service: FlashcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers: [
        FlashcardService,
        HttpClient
      ]
    });
    injector = getTestBed();
    service = injector.get(FlashcardService);
    httpClient = injector.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should conntect with server and recive response', () => {
    service.getMessage().subscribe((data) => {
      console.log(data.message);
      expect(data.message).toEqual('Hello');
    });
  });
});
