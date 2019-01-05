import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAreasComponent } from './city-areas.component';

describe('CityAreasComponent', () => {
  let component: CityAreasComponent;
  let fixture: ComponentFixture<CityAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
