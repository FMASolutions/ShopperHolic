import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupDetailComponent } from './sub-group-detail.component';

describe('SubGroupDetailComponent', () => {
  let component: SubGroupDetailComponent;
  let fixture: ComponentFixture<SubGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
