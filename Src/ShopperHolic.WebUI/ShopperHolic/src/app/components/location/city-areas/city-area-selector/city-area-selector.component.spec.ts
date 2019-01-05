import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAreaSelectorComponent } from './city-area-selector.component';

describe('CityAreaSelectorComponent', () => {
  let component: CityAreaSelectorComponent;
  let fixture: ComponentFixture<CityAreaSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityAreaSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAreaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
