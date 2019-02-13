import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmaItemDetailComponent } from './rma-item-detail.component';

describe('RmaItemDetailComponent', () => {
  let component: RmaItemDetailComponent;
  let fixture: ComponentFixture<RmaItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmaItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmaItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
