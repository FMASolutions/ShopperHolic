import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCreditNotesComponent } from './all-credit-notes.component';

describe('AllCreditNotesComponent', () => {
  let component: AllCreditNotesComponent;
  let fixture: ComponentFixture<AllCreditNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCreditNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCreditNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
