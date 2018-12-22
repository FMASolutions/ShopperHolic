import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupSearchComponent } from './sub-group-search.component';

describe('SubGroupSearchComponent', () => {
  let component: SubGroupSearchComponent;
  let fixture: ComponentFixture<SubGroupSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubGroupSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
