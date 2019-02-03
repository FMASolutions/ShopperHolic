import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDeliveryNotesComponent } from './all-delivery-notes.component';

describe('AllDeliveryNotesComponent', () => {
  let component: AllDeliveryNotesComponent;
  let fixture: ComponentFixture<AllDeliveryNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDeliveryNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDeliveryNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
