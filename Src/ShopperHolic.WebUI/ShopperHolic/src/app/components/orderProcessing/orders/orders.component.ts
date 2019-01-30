import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';
import { OrderService } from 'src/app/services/orderProcessing/order.service';
import { Globals } from 'src/globals';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public service: OrderService, public childDialog: MatDialog) { }

  ngOnInit() {
  }

  public createClicked(){
    let dialogRef = this.childDialog.open(OrderDetailComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { 
        this.service.goToOrderPage(resp.newModel.header.orderID);
      }
      obs.unsubscribe();
    });
  }

}
