import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemSelecorComponent } from './order-item-selecor.component';

describe('OrderItemSelecorComponent', () => {
  let component: OrderItemSelecorComponent;
  let fixture: ComponentFixture<OrderItemSelecorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemSelecorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemSelecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
