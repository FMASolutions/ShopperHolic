import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupUpdateComponent } from './product-group-update.component';

describe('ProductGroupUpdateComponent', () => {
  let component: ProductGroupUpdateComponent;
  let fixture: ComponentFixture<ProductGroupUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductGroupUpdateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
