import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsContainerComponent } from './translations-container.component';

describe('TranslationsContainerComponent', () => {
  let component: TranslationsContainerComponent;
  let fixture: ComponentFixture<TranslationsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
