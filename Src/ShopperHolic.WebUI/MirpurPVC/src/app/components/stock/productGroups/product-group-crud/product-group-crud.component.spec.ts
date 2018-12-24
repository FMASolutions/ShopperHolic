import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupCRUDComponent } from './product-group-crud.component';

describe('ProductGroupCRUDComponent', () => {
  let component: ProductGroupCRUDComponent;
  let fixture: ComponentFixture<ProductGroupCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
