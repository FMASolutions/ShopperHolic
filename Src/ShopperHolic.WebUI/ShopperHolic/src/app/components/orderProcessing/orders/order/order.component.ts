import { Component, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/orderProcessing/order.service';
import { ActivatedRoute } from '@angular/router';
import { isNumber } from 'util';
import { Sort, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Globals } from 'src/globals';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderItemDetailComponent } from '../order-item-detail/order-item-detail.component';
import { DeliveryNotesComponent } from '../../delivery-notes/delivery-notes.component';
import { InvoicesComponent } from '../../invoices/invoices.component';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';
import { CreditNotesComponent } from '../../credit-notes/credit-notes.component';
import { ReturnNotesComponent } from '../../return-notes/return-notes.component';
import { RmaListComponent } from '../../rmas/rma-list/rma-list.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(DeliveryNotesComponent) childDeliveryNotes;
  @ViewChild(InvoicesComponent) childInvoices;
  @ViewChild(RmaListComponent) childRMAs;
  @ViewChild(CreditNotesComponent) childCreditNotes;
  @ViewChild(ReturnNotesComponent) childReturnNotes;

  columnList: string[] = Globals.ORDER_ITEM_LIST_COUMNS;
  receivedOrderNumber: number = 0;
  public hasRMAs: boolean = true;
  public hasCreditNotes: boolean = true;
  public hasReturnNotes: boolean = true;
  public hasDeliveryNotes: boolean = true;
  public hasInvoices: boolean = true;


  constructor(public service: OrderService, private route: ActivatedRoute, private navService: AppNavigationService, public childDialog: MatDialog) {
    this.service.initalizeDetailedOrderForm();
    let id = Number(this.route.snapshot.queryParams['id']);
    if (id > 0 && isNumber(id)) {
      this.receivedOrderNumber = id;
      let obs = this.service.getByID(id).subscribe(modelResp => {
        this.service.populateDetailedOrderFormFromModel(modelResp, this.paginator);
        this.childDeliveryNotes.refreshDeliveryNoteTableData(modelResp.deliveryNotes);
        this.childInvoices.refreshInvoiceTableData(modelResp.invoices);
        this.childCreditNotes.refreshCreditNoteTableData(modelResp.creditNotes);
        this.childReturnNotes.refreshReturnNoteTableData(modelResp.returnNotes);
        this.childRMAs.refreshRMATableData(modelResp.rmas);
        this.hasCreditNotes = (modelResp.creditNotes.length > 0) ? true : false;
        this.hasReturnNotes = (modelResp.returnNotes.length > 0) ? true : false;
        this.hasDeliveryNotes = (modelResp.deliveryNotes.length > 0) ? true : false;
        this.hasRMAs = (modelResp.rmas.length > 0) ? true : false;
        this.hasInvoices = (modelResp.invoices.length > 0) ? true : false;
        
        obs.unsubscribe();
      })
    };
  }

  public updateOrderClicked() {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = this.receivedOrderNumber;
    let dialogRef = this.childDialog.open(OrderDetailComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) {
        this.service.populateDetailedOrderFormFromModel(resp.newModel, this.paginator);
      }
      obs.unsubscribe();
    });
  }

  public deleteOrderClicked() {
    if (confirm(Globals.ORDER_DELETE_CONFIRM_MSG + this.receivedOrderNumber)) {
      let obs = this.service.delete(this.receivedOrderNumber).subscribe(resp => {
        this.navService.goToOrdersPage();
        obs.unsubscribe();
      });
    }
  }

  public invoiceOrderClicked() {
    if (confirm("Are you sure you wish to invoice outstanding items?")) {
      this.service.invoiceOrderAndDisplayInvoice(this.receivedOrderNumber);
    }
  }

  public deliverOrderClicked() {
    if (confirm("Are you sure you wish to delivery outstanding items?")) {
      this.service.deliverOrderAndDisplayDeliveryNote(this.receivedOrderNumber);
    }
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
