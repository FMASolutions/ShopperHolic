import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnathorisedComponent } from './unathorised.component';

describe('UnathorisedComponent', () => {
  let component: UnathorisedComponent;
  let fixture: ComponentFixture<UnathorisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnathorisedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnathorisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
