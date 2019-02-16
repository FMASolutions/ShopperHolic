import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceItem } from 'src/app/models/orderProcessing/invoices/invoiceItem';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';
import { InvoicePreview } from 'src/app/models/orderProcessing/invoices/invoicePreview';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/Invoice/';

  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public invoiceOrder(orderID: number): Observable<InvoiceItem[]> {
    this.userNotificationService.informUserStart(Globals.ORDER_INVOICE_ATTEMPT + orderID, Globals.ORDER_INVOICE_ATTEMPT + orderID);
    return this.http.put<InvoiceItem[]>(this.baseURL + 'InvoiceOrder?orderID=' + orderID, orderID).pipe(tap(resp => {
      if (resp[0]) {
        this.userNotificationService.informUserComplete(Globals.ORDER_INVOICE_SUCCESS + resp[0].orderID);
      }
      else {
        this.userNotificationService.informUserError(Globals.ORDER_INVOICE_FAILED + orderID);
      }
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_INVOICE_FAILED + orderID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<InvoiceItem[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<InvoiceItem[]>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.INVOICE_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<InvoicePreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<InvoicePreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.INVOICE_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  /*--------------------- --- Invoice Preview table Helper --- ----------------------*/
  invoiceList: MatTableDataSource<InvoicePreview>;
  textFilter: string = "";

  public sortInvoiceTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.invoiceList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.invoiceID, b.invoiceID, isAsc);
        case 'CustomerName': return this.compare(a.customerName.toLowerCase(), b.customerName.toLowerCase(), isAsc);
        case 'Status': return this.compare(a.invoiceStatus.toLowerCase(), b.invoiceStatus.toLowerCase(), isAsc);
        case 'InvoiceDate': return this.compare(a.invoiceDate.toString(), b.invoiceDate.toString(), isAsc);
        case 'InvoiceTotal': return this.compare(a.invoiceTotal.toString(), b.invoiceTotal.toString(), isAsc);
        default: return 0;
      }
    });
    this.setupInvoiceTableDataSource(sortedData, paginator);
  }

  public refreshInvoiceListData(paginator: MatPaginator, itemList: InvoicePreview[]) {
    this.setupInvoiceTableDataSource(itemList, paginator);
  }

  private setupInvoiceTableDataSource(data: InvoicePreview[], paginator: MatPaginator) {
    this.invoiceList = new MatTableDataSource(data);
    this.invoiceList.paginator = paginator;
  }

  public addInvoiceToTable(newModel: InvoicePreview) {
    let currentData = this.invoiceList.data;
    currentData.push(newModel);
    this.invoiceList.data = currentData;
  }

  public resetInvoiceTableFilter() {
    this.textFilter = "";
    this.applyListFilter();
  }

  public applyListFilter() { this.invoiceList.filter = this.textFilter.trim().toLowerCase(); }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }


  /*--------------------- --- Display Form Helper --- ----------------------*/
  public invoiceForm: FormGroup;

  public InitializeForm(id?: any) {
    this.invoiceForm = this.fb.group({
      id: 0,
      orderID: 0,
      invoiceDate: '',
      customerName: '',
      invoiceTotal: 0.00
    });
  }

  public populateFormFromModel(model: InvoiceItem[], paginator: MatPaginator) {
    if (model[0]) {
      let currentInvoiceTotal: number = this.calcInvoiceTotal(model);
      this.invoiceForm.setValue({
        id: model[0].invoiceID,
        orderID: model[0].orderID,
        invoiceDate: model[0].invoiceDate,
        customerName: model[0].customerName,
        invoiceTotal: currentInvoiceTotal
      });
      this.populateItemData(model, paginator);
    }
  }

  private populateItemData(items: InvoiceItem[], paginator: MatPaginator) {
    this.setupInvoiceItemTableDataSource(items, paginator);
  }

  private calcInvoiceTotal(items: InvoiceItem[]): number {
    let currentInvoiceTotal: number = 0;
    items.forEach(currentItem => {
      currentInvoiceTotal += currentItem.itemTotal;
    })

    return Math.round((currentInvoiceTotal + 0.00001) * 100) / 100
  }

  /*--------------------- --- Invoice ITEMS Preview table Helper --- ----------------------*/
  invoiceItemList: MatTableDataSource<InvoiceItem>;
  itemTextFilter: string = "";

  public sortInvoiceItemTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.invoiceItemList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Code': return this.compare(a.itemCode.toLowerCase(), b.itemCode.toLowerCase(), isAsc);
        case 'ItemDesc': return this.compare(a.itemDescription.toLowerCase(), b.itemDescription.toLowerCase(), isAsc);
        case 'Price': return this.compare(a.itemPrice, b.itemPrice, isAsc);
        case 'Qty': return this.compare(a.itemQty, b.itemQty, isAsc);
        case 'Total': return this.compare(a.itemTotal, b.itemTotal, isAsc);
        default: return 0;
      }
    });
    this.setupInvoiceItemTableDataSource(sortedData, paginator);
  }

  public refreshInvoiceItemListData(paginator: MatPaginator, itemList: InvoiceItem[]) {
    this.setupInvoiceItemTableDataSource(itemList, paginator);
  }

  private setupInvoiceItemTableDataSource(data: InvoiceItem[], paginator: MatPaginator) {
    this.invoiceItemList = new MatTableDataSource(data);
    this.invoiceItemList.paginator = paginator;
  }

  public resetInvoiceItemTableFilter() {
    this.itemTextFilter = "";
    this.applyItemListFilter();
  }

  public applyItemListFilter() { this.invoiceItemList.filter = this.textFilter.trim().toLowerCase(); }
}
