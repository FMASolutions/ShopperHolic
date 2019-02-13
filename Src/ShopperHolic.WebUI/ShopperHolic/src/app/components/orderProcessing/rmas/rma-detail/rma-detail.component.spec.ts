import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmaDetailComponent } from './rma-detail.component';

describe('RmaDetailComponent', () => {
  let component: RmaDetailComponent;
  let fixture: ComponentFixture<RmaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
