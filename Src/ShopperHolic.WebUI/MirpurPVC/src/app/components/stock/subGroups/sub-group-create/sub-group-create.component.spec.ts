import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupCreateComponent } from './sub-group-create.component';

describe('SubGroupCreateComponent', () => {
  let component: SubGroupCreateComponent;
  let fixture: ComponentFixture<SubGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
