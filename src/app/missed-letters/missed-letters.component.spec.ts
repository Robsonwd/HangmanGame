import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedLettersComponent } from './missed-letters.component';

describe('MissedLettersComponent', () => {
  let component: MissedLettersComponent;
  let fixture: ComponentFixture<MissedLettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissedLettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissedLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
