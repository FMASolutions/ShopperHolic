import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmasComponent } from './rmas.component';

describe('RmasComponent', () => {
  let component: RmasComponent;
  let fixture: ComponentFixture<RmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
