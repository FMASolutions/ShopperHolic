import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingConfigComponent } from './landing-config.component';

describe('LandingConfigComponent', () => {
  let component: LandingConfigComponent;
  let fixture: ComponentFixture<LandingConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
