import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmanComponent } from './hangman.component';

describe('HangmanComponent', () => {
  let component: HangmanComponent;
  let fixture: ComponentFixture<HangmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
