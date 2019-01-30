import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/orderProcessing/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'util';
import { Sort, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Globals } from 'src/globals';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderItemDetailComponent } from '../order-item-detail/order-item-detail.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.ORDER_ITEM_LIST_COUMNS;
  receivedOrderNumber: number = 0;


  constructor(public service: OrderService, private route: ActivatedRoute, private router: Router, public childDialog: MatDialog) {
    let id = Number(this.route.snapshot.queryParams['id']);
    if (id > 0 && isNumber(id)) {
      this.receivedOrderNumber = id;
      this.service.initalizeDetailedOrderForm(id, this.paginator);
    };
  }

  public updateOrderClicked() {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = this.receivedOrderNumber;
    let dialogRef = this.childDialog.open(OrderDetailComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) {
        this.service.populateDetailedOrderFormFromModel(resp.newModel);
      }
      obs.unsubscribe();
    });
  }

  public deleteOrderClicked() {
    if (confirm(Globals.ORDER_DELETE_CONFIRM_MSG + this.receivedOrderNumber)) {
      let obs = this.service.delete(this.receivedOrderNumber).subscribe(resp => {
        this.router.navigateByUrl('/orders')
        obs.unsubscribe();
      });
    }
  }

  public invoiceOrderClicked() {

  }

  public deliverOrderClicked() {

  }

  public editItemClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.childDialog.open(OrderItemDetailComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshItemListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public addItemClicked() {
    let dialogRef = this.childDialog.open(OrderItemDetailComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshItemListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public removeItemClicked(id: number) {
    let obs = this.service.removeItemFromOrder(id).subscribe(resp => {
      this.service.removeOrderItemFromTable(id);
      obs.unsubscribe();
    });
  }

  public sortClicked(sort: Sort) { this.service.sortItemTableData(sort, this.paginator); }

}
