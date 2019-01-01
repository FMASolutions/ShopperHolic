import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupSelectorComponent } from './product-group-selector.component';

describe('ProductGroupSelectorComponent', () => {
  let component: ProductGroupSelectorComponent;
  let fixture: ComponentFixture<ProductGroupSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
