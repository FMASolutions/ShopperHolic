import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupListComponent } from './sub-group-list.component';

describe('SubGroupListComponent', () => {
  let component: SubGroupListComponent;
  let fixture: ComponentFixture<SubGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
