import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupGridComponent } from './product-group-grid.component';

describe('ProductGroupGridComponent', () => {
  let component: ProductGroupGridComponent;
  let fixture: ComponentFixture<ProductGroupGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductGroupGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
