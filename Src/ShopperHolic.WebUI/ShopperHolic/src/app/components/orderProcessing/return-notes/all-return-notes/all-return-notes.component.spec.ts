import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReturnNotesComponent } from './all-return-notes.component';

describe('AllReturnNotesComponent', () => {
  let component: AllReturnNotesComponent;
  let fixture: ComponentFixture<AllReturnNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllReturnNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReturnNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
