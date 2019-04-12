import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReturnNoteItem } from 'src/app/models/orderProcessing/returnNotes/returnNoteItem';
import { tap } from 'rxjs/operators';
import { ReturnNotePreview } from 'src/app/models/orderProcessing/returnNotes/returnNotePreview';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ReturnNoteService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/ReturnNote/';
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public processReturn(rmaID: number): Observable<ReturnNoteItem[]> {
    this.userNotificationService.informUserStart(Globals.RMA_RETURN_ATTEMPT + rmaID, Globals.RMA_RETURN_ATTEMPT + rmaID);
    return this.http.put<ReturnNoteItem[]>(this.baseURL + 'ProcessReturn?rmaID=' + rmaID, rmaID).pipe(tap(resp => {
      if(resp[0]){
      this.userNotificationService.informUserComplete(Globals.RMA_RETURN_SUCCESS + resp[0].returnNoteID);
      }
      else{
        this.userNotificationService.informUserError(Globals.RMA_RETURN_FAILED);
      }
    }, err => {
      this.userNotificationService.informUserError(Globals.RMA_RETURN_FAILED + rmaID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(returnNoteID: number): Observable<ReturnNoteItem[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ReturnNoteItem[]>(this.baseURL + 'GetByID/?returnNoteID=' + returnNoteID.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.RETURN_NOTE_READ_FAILED_MSG + returnNoteID);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<ReturnNotePreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ReturnNotePreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.RETURN_NOTE_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  /*--------------------- --- Delivery Note Preview table Helper --- ----------------------*/
  returnNoteList: MatTableDataSource<ReturnNotePreview>;
  textFilter: string = "";

  public sortReturnNoteTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.returnNoteList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.returnNoteID, b.returnNoteID, isAsc);
        case 'CustomerName': return this.compare(a.customerName.toLowerCase(), b.customerName.toLowerCase(), isAsc);
        case 'ReturnDate': return this.compare(a.returnedDate.toString(), b.returnedDate.toString(), isAsc);
        default: return 0;
      }
    });
    this.setupReturnNoteTableDataSource(sortedData, paginator);
  }

  public refreshReturnNoteListData(paginator: MatPaginator, itemList: ReturnNotePreview[]) {
      this.setupReturnNoteTableDataSource(itemList, paginator);
  }

  private setupReturnNoteTableDataSource(data: ReturnNotePreview[], paginator: MatPaginator) {
    this.returnNoteList = new MatTableDataSource(data);
    this.returnNoteList.paginator = paginator;
  }

  public addReturnNoteToTable(newModel: ReturnNotePreview) {
    let currentData = this.returnNoteList.data;
    currentData.push(newModel);
    this.returnNoteList.data = currentData;
  }

  public resetReturnNoteTableFilter(){
    this.textFilter = "";
    this.applyListFilter();
  }

  public applyListFilter(){ this.returnNoteList.filter = this.textFilter.trim().toLowerCase(); }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }


  /*--------------------- --- Display Form Helper --- ----------------------*/
  public returnNoteForm: FormGroup;

  public InitializeForm(id?: any) {
    this.returnNoteForm = this.fb.group({
      id: 0,
      rmaID: 0, 
      returnDate: '',
      customerName: '',
    });
  }

  public populateFormFromModel(model: ReturnNoteItem[], paginator: MatPaginator) {
    this.returnNoteForm.setValue({
      id: model[0].returnNoteID,
      rmaID: model[0].rmaid,
      returnDate: model[0].returnedDate,
      customerName: model[0].customerName,
    });

    this.populateItemData(model, paginator);
  }
  
  private populateItemData(items: ReturnNoteItem[], paginator: MatPaginator){
    this.setupReturnNoteItemTableDataSource(items, paginator);
  }

  /*--------------------- --- Delivery Note ITEMS Preview table Helper --- ----------------------*/
  returnNoteItemList: MatTableDataSource<ReturnNoteItem>;
  itemTextFilter: string = "";

  public sortReturnNoteItemTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.returnNoteItemList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Code': return this.compare(a.itemCode.toLowerCase(), b.itemCode.toLowerCase(), isAsc);
        case 'ItemDesc': return this.compare(a.orderItemDescription.toLowerCase(), b.orderItemDescription.toLowerCase(), isAsc);
        case 'Qty': return this.compare(a.returnQty, b.returnQty, isAsc);
        default: return 0;
      }
    });
    this.setupReturnNoteItemTableDataSource(sortedData, paginator);
  }

  public refreshReturnNoteItemListData(paginator: MatPaginator, itemList: ReturnNoteItem[]) {
      this.setupReturnNoteItemTableDataSource(itemList, paginator);
  }

  private setupReturnNoteItemTableDataSource(data: ReturnNoteItem[], paginator: MatPaginator) {
    this.returnNoteItemList = new MatTableDataSource(data);
    this.returnNoteItemList.paginator = paginator;
  }

  public resetReturnNoteItemTableFilter(){
    this.itemTextFilter = "";
    this.applyItemListFilter();
  }

  public applyItemListFilter(){ this.returnNoteItemList.filter = this.textFilter.trim().toLowerCase(); }
}
