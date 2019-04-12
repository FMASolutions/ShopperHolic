import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreditNoteItem } from 'src/app/models/orderProcessing/creditNotes/creditNoteItem';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreditNotePreview } from 'src/app/models/orderProcessing/creditNotes/creditNotePreview';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/CreditNote/';

  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public creditRMA(rmaID: number): Observable<CreditNoteItem[]> {
    this.userNotificationService.informUserStart(Globals.RMA_CREDIT_NOTE_ATTEMPT + rmaID, Globals.ORDER_INVOICE_ATTEMPT + rmaID);
    return this.http.put<CreditNoteItem[]>(this.baseURL + 'CreditRMA?rmaID=' + rmaID, rmaID).pipe(tap(resp => {
      if (resp[0]) {
        this.userNotificationService.informUserComplete(Globals.RMA_CREDIT_NOTE_SUCCESS + resp[0].orderID);
      }
      else {
        this.userNotificationService.informUserError(Globals.RMA_CREDIT_NOTE_FAILED + rmaID);
      }
    }, err => {
      this.userNotificationService.informUserError(Globals.RMA_CREDIT_NOTE_FAILED + rmaID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<CreditNoteItem[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<CreditNoteItem[]>(this.baseURL + 'GetByID/?creditNoteID=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.CREDIT_NOTE_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<CreditNotePreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<CreditNotePreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.CREDIT_NOTE_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  /*--------------------- --- Credit Note Preview table Helper --- ----------------------*/
  creditNoteList: MatTableDataSource<CreditNotePreview>;
  textFilter: string = "";

  public sortCreditNoteTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.creditNoteList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.creditNoteID, b.creditNoteID, isAsc);
        case 'CustomerName': return this.compare(a.customerName.toLowerCase(), b.customerName.toLowerCase(), isAsc);
        case 'Status': return this.compare(a.creditNoteStatus.toLowerCase(), b.creditNoteStatus.toLowerCase(), isAsc);
        case 'CreditDate': return this.compare(a.creditNoteDate.toString(), b.creditNoteDate.toString(), isAsc);
        case 'CreditTotal': return this.compare(a.creditTotal.toString(), b.creditTotal.toString(), isAsc);
        default: return 0;
      }
    });
    this.setupCreditNoteTableDataSource(sortedData, paginator);
  }

  public refreshCreditNoteListData(paginator: MatPaginator, itemList: CreditNotePreview[]) {
    this.setupCreditNoteTableDataSource(itemList, paginator);
  }

  private setupCreditNoteTableDataSource(data: CreditNotePreview[], paginator: MatPaginator) {
    this.creditNoteList = new MatTableDataSource(data);
    this.creditNoteList.paginator = paginator;
  }

  public addCreditNoteToTable(newModel: CreditNotePreview) {
    let currentData = this.creditNoteList.data;
    currentData.push(newModel);
    this.creditNoteList.data = currentData;
  }

  public resetCreditNoteTableFilter() {
    this.textFilter = "";
    this.applyListFilter();
  }

  public applyListFilter() { this.creditNoteList.filter = this.textFilter.trim().toLowerCase(); }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }


  /*--------------------- --- Display Form Helper --- ----------------------*/
  public creditNoteForm: FormGroup;

  public InitializeForm(id?: any) {
    this.creditNoteForm = this.fb.group({
      id: 0,
      rmaID: 0,
      creditNoteDate: '',
      customerName: '',
      creditTotal: 0.00
    });
  }

  public populateFormFromModel(model: CreditNoteItem[], paginator: MatPaginator) {
    if (model[0]) {
      let currentCreditNoteTotal: number = this.calcCreditNoteTotal(model);
      this.creditNoteForm.setValue({
        id: model[0].creditNoteID,
        rmaID: model[0].rmaid,
        creditNoteDate: model[0].creditDate,
        customerName: model[0].customerName,
        creditTotal: currentCreditNoteTotal
      });
      this.populateItemData(model, paginator);
    }
  }

  private populateItemData(items: CreditNoteItem[], paginator: MatPaginator) {
    this.setupCreditNoteItemTableDataSource(items, paginator);
  }

  private calcCreditNoteTotal(items: CreditNoteItem[]): number {
    let currentCreditNoteTotal: number = 0;
    items.forEach(currentItem => {
      currentCreditNoteTotal += currentItem.creditItemTotal;
    })

    return Math.round((currentCreditNoteTotal + 0.00001) * 100) / 100
  }



  /*--------------------- --- Credit Note ITEMS Preview table Helper --- ----------------------*/
  creditNoteItemList: MatTableDataSource<CreditNoteItem>;
  itemTextFilter: string = "";

  public sortCreditNoteItemTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.creditNoteItemList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Code': return this.compare(a.itemCode.toLowerCase(), b.itemCode.toLowerCase(), isAsc);
        case 'ItemDesc': return this.compare(a.itemDescription.toLowerCase(), b.itemDescription.toLowerCase(), isAsc);
        case 'Price': return this.compare(a.itemPrice, b.itemPrice, isAsc);
        case 'Qty': return this.compare(a.creditQty, b.creditQty, isAsc);
        case 'Total': return this.compare(a.creditItemTotal, b.creditItemTotal, isAsc);
        default: return 0;
      }
    });
    this.setupCreditNoteItemTableDataSource(sortedData, paginator);
  }

  public refreshCreditNoteItemListData(paginator: MatPaginator, itemList: CreditNoteItem[]) {
    this.setupCreditNoteItemTableDataSource(itemList, paginator);
  }

  private setupCreditNoteItemTableDataSource(data: CreditNoteItem[], paginator: MatPaginator) {
    this.creditNoteItemList = new MatTableDataSource(data);
    this.creditNoteItemList.paginator = paginator;
  }

  public resetCreditNoteItemTableFilter() {
    this.itemTextFilter = "";
    this.applyItemListFilter();
  }

  public applyItemListFilter() { this.creditNoteItemList.filter = this.textFilter.trim().toLowerCase(); }
  
}
