import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardContainerComponent } from './flashcard-container.component';

describe('FlashcardContainerComponent', () => {
  let component: FlashcardContainerComponent;
  let fixture: ComponentFixture<FlashcardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
