import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsComponent } from './flashcards.component';
import { HttpClient } from '@angular/common/http';
import { FlashcardService } from './flashcard.service';
import { Observable, of} from 'rxjs';

describe('FlashcardsComponent', () => {
  let component: FlashcardsComponent;
  let fixture: ComponentFixture<FlashcardsComponent>;
  let httpClientMock;
  let service: FlashcardService;

  beforeEach(async(() => {
    httpClientMock = jasmine.createSpyObj(['post']);
    httpClientMock.post.and.returnValue(of({message: ''}));

    TestBed.configureTestingModule({
      declarations: [ FlashcardsComponent ],
      providers: [
        {
          FlashcardService,
          provide: HttpClient,
          useValue: httpClientMock
        }
      ]
    })
    .compileComponents();

    service = TestBed.inject(FlashcardService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
