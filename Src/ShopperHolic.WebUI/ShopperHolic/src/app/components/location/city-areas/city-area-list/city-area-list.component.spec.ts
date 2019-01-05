import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAreaListComponent } from './city-area-list.component';

describe('CityAreaListComponent', () => {
  let component: CityAreaListComponent;
  let fixture: ComponentFixture<CityAreaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityAreaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
