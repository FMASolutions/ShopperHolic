import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupUpdateComponent } from './sub-group-update.component';

describe('SubGroupUpdateComponent', () => {
  let component: SubGroupUpdateComponent;
  let fixture: ComponentFixture<SubGroupUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubGroupUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
