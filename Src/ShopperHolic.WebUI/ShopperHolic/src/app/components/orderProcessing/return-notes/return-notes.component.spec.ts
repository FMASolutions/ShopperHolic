import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnNotesComponent } from './return-notes.component';

describe('ReturnNotesComponent', () => {
  let component: ReturnNotesComponent;
  let fixture: ComponentFixture<ReturnNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
