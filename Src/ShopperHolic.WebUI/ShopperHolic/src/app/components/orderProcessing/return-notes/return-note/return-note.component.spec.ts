import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnNoteComponent } from './return-note.component';

describe('ReturnNoteComponent', () => {
  let component: ReturnNoteComponent;
  let fixture: ComponentFixture<ReturnNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
