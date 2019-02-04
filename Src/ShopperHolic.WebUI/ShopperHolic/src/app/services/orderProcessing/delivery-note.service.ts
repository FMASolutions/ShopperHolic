import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { Observable } from 'rxjs';
import { DeliveryNoteItem } from 'src/app/models/orderProcessing/deliveryNotes/deliveryNoteItem'
import { tap } from 'rxjs/operators';
import { DeliveryNotePreview } from 'src/app/models/orderProcessing/deliveryNotes/deliveryNotePreview';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/DeliveryNote/';
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public deliverOrder(orderID: number): Observable<DeliveryNoteItem[]> {
    this.userNotificationService.informUserStart(Globals.ORDER_DELIVERY_ATTEMPT + orderID, Globals.ORDER_DELIVERY_ATTEMPT + orderID);
    return this.http.put<DeliveryNoteItem[]>(this.baseURL + 'DeliverOrder?orderID=' + orderID, orderID).pipe(tap(resp => {
      if(resp[0]){
      this.userNotificationService.informUserComplete(Globals.ORDER_DELIVERY_SUCCESS + resp[0].orderHeaderID);
      }
      else{
        this.userNotificationService.informUserError(Globals.ORDER_DELIVERY_FAILED);
      }
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_DELIVERY_FAILED + orderID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(deliveryNoteID: number): Observable<DeliveryNoteItem[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<DeliveryNoteItem[]>(this.baseURL + 'GetByID/?deliveryNoteID=' + deliveryNoteID.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.DELIVERY_NOTE_READ_FAILED_MSG + deliveryNoteID);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<DeliveryNotePreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<DeliveryNotePreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.DELIVERY_NOTE_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  /*--------------------- --- Delivery Note Preview table Helper --- ----------------------*/
  deliveryNoteList: MatTableDataSource<DeliveryNotePreview>;
  textFilter: string = "";

  public sortDeliveryNoteTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.deliveryNoteList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.deliveryNoteID, b.deliveryNoteID, isAsc);
        case 'CustomerName': return this.compare(a.customerName.toLowerCase(), b.customerName.toLowerCase(), isAsc);
        case 'DeliveryDate': return this.compare(a.deliveryDate.toString(), b.deliveryDate.toString(), isAsc);
        default: return 0;
      }
    });
    this.setupDeliveryNoteTableDataSource(sortedData, paginator);
  }

  public refreshDeliveryNoteListData(paginator: MatPaginator, itemList: DeliveryNotePreview[]) {
      this.setupDeliveryNoteTableDataSource(itemList, paginator);
  }

  private setupDeliveryNoteTableDataSource(data: DeliveryNotePreview[], paginator: MatPaginator) {
    this.deliveryNoteList = new MatTableDataSource(data);
    this.deliveryNoteList.paginator = paginator;
  }

  public addDeliveryNoteToTable(newModel: DeliveryNotePreview) {
    let currentData = this.deliveryNoteList.data;
    currentData.push(newModel);
    this.deliveryNoteList.data = currentData;
  }

  public resetDeliveryNoteTableFilter(){
    this.textFilter = "";
    this.applyListFilter();
  }

  public applyListFilter(){ this.deliveryNoteList.filter = this.textFilter.trim().toLowerCase(); }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }


  /*--------------------- --- Display Form Helper --- ----------------------*/
  public deliveryNoteForm: FormGroup;

  public InitializeForm(id?: any) {
    this.deliveryNoteForm = this.fb.group({
      id: 0,
      orderID: 0, 
      deliveryDate: '',
      customerName: '',
    });
  }

  public populateFormFromModel(model: DeliveryNoteItem[], paginator: MatPaginator) {
    this.deliveryNoteForm.setValue({
      id: model[0].deliveryNoteID,
      orderID: model[0].orderHeaderID,
      deliveryDate: model[0].deliveryDate,
      customerName: model[0].customerName,
    });

    this.populateItemData(model, paginator);
  }
  
  private populateItemData(items: DeliveryNoteItem[], paginator: MatPaginator){
    this.setupDeliveryNoteItemTableDataSource(items, paginator);
  }

  /*--------------------- --- Delivery Note ITEMS Preview table Helper --- ----------------------*/
  deliveryNoteItemList: MatTableDataSource<DeliveryNoteItem>;
  itemTextFilter: string = "";

  public sortDeliveryNoteItemTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.deliveryNoteItemList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ItemDesc': return this.compare(a.orderItemDescription.toLowerCase(), b.orderItemDescription.toLowerCase(), isAsc);
        case 'Qty': return this.compare(a.orderItemQty, b.orderItemQty, isAsc);
        default: return 0;
      }
    });
    this.setupDeliveryNoteItemTableDataSource(sortedData, paginator);
  }

  public refreshDeliveryNoteItemListData(paginator: MatPaginator, itemList: DeliveryNoteItem[]) {
      this.setupDeliveryNoteItemTableDataSource(itemList, paginator);
  }

  private setupDeliveryNoteItemTableDataSource(data: DeliveryNoteItem[], paginator: MatPaginator) {
    this.deliveryNoteItemList = new MatTableDataSource(data);
    this.deliveryNoteItemList.paginator = paginator;
  }

  public resetDeliveryNoteItemTableFilter(){
    this.itemTextFilter = "";
    this.applyItemListFilter();
  }

  public applyItemListFilter(){ this.deliveryNoteItemList.filter = this.textFilter.trim().toLowerCase(); }
}
