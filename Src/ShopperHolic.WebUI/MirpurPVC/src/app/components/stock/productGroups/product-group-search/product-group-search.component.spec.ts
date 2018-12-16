import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupSearchComponent } from './product-group-search.component';

describe('ProductGroupSearchComponent', () => {
  let component: ProductGroupSearchComponent;
  let fixture: ComponentFixture<ProductGroupSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductGroupSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
