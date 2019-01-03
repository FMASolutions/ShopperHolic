import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupSelectorComponent } from './sub-group-selector.component';

describe('SubGroupSelectorComponent', () => {
  let component: SubGroupSelectorComponent;
  let fixture: ComponentFixture<SubGroupSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubGroupSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
