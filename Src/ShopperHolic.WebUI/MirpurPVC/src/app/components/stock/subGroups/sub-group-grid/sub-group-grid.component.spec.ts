import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupGridComponent } from './sub-group-grid.component';

describe('SubGroupGridComponent', () => {
  let component: SubGroupGridComponent;
  let fixture: ComponentFixture<SubGroupGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubGroupGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
