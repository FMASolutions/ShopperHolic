import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericValidator } from '../generic/generic-validator';
import { AppNavigationService } from '../generic/app-navigation.service';
import { ReturnNoteService } from './return-note.service';
import { CreditNoteService } from './credit-note.service';
import { CreateRMA } from 'src/app/models/orderProcessing/rmas/createRMA';
import { Observable } from 'rxjs';
import { RMADetailed } from 'src/app/models/orderProcessing/rmas/rmaDetailed';
import { tap } from 'rxjs/operators';
import { RMAPreview } from 'src/app/models/orderProcessing/rmas/rmaPreview';
import { RMAItem } from 'src/app/models/orderProcessing/rmas/rmaItem';
import { CreateRMAItem } from 'src/app/models/orderProcessing/rmas/createRMAItem';
import { UpdateRMAItem } from 'src/app/models/orderProcessing/rmas/updateRMAItem';
import { Order } from 'src/app/models/orderProcessing/orders/order';
import { MatPaginator, MatTableDataSource, Sort } from '@angular/material';
import { OrderItem } from 'src/app/models/orderProcessing/orders/orderItem';

@Injectable({
  providedIn: 'root'
})
export class RmaService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/RMA/';

  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, 
    private fbRMADetailed: FormBuilder, private validator: GenericValidator, private navService: AppNavigationService, 
    private returnNoteService: ReturnNoteService, private creditService: CreditNoteService) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateRMA): Observable<RMADetailed> {
    this.userNotificationService.informUserStart(Globals.RMA_CREATE_ATTEMPT_MSG + "Order number: " + newModel.orderHeaderID, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<RMADetailed>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.RMA_CREATE_SUCCESS_MSG + resp.header.rmaID);
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_CREATE_FAILED_MSG + newModel.orderHeaderID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(rmaID: number): Observable<RMADetailed> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<RMADetailed>(this.baseURL + 'GetByID/?rmaID=' + rmaID.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.RMA_READ_FAILED_MSG + rmaID);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<RMAPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<RMAPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.RMA_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(rmaID: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.RMA_DELETE_ATTEMPT_MSG + rmaID, Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?rmaID=" + rmaID.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.RMA_DELETE_SUCCESS_MSG + rmaID);
    }, err => {
      this.userNotificationService.informUserError(Globals.RMA_DELETE_FAILED_MSG + rmaID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getRMAItemByID(rmaItemID: number): Observable<RMAItem> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<RMAItem>(this.baseURL + 'GetRMAItemByID?rmaItemID=' + rmaItemID.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.RMA_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }))
  }

  public getItemsForRMA(id: number): Observable<RMAItem[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<RMAItem[]>(this.baseURL + 'GetItemsForRMA?rmaID=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.RMA_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }))
  }

  public addItemToRMA(model: CreateRMAItem): Observable<RMAItem> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.RMA_ITEM_CREATE_ATTEMPT_MSG + model.returnReason);
    return this.http.post<RMAItem>(this.baseURL + 'AddItemToRMA', model).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.RMA_ITEM_UPDATE_SUCCESS_MSG + model.returnReason);
      this.userNotificationService.informUserError(err.error);
    }))
  }

  public updateRMAItem(model: UpdateRMAItem): Observable<RMAItem> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.RMA_ITEM_UPDATE_ATTEMPT_MSG + model.returnReason);
    return this.http.put<RMAItem>(this.baseURL + 'UpdateRMAItem', model).pipe(tap(() => {
      this.userNotificationService.informUserComplete(Globals.RMA_UPDATE_SUCCESS_MSG);
    }, err => {
      this.userNotificationService.informUserError(Globals.RMA_ITEM_UPDATE_FAILED_MSG + model.returnReason);
      this.userNotificationService.informUserError(err.error);
    }))
  }

  public removeItemFromRMA(rmaItemID: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.RMA_ITEM_DELETE_ATTEMPT_MSG + rmaItemID, Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "RemoveItemFromRMA?rmaItemID=" + rmaItemID.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.RMA_ITEM_DELETE_SUCCESS_MSG + rmaItemID);
    }, err => {
      this.userNotificationService.informUserError(Globals.RMA_ITEM_DELETE_FAILED_MSG + rmaItemID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public returnRMAAndDisplayReturnNote(rmaID: number){
    let obs = this.returnNoteService.processReturn(rmaID).subscribe(resp =>{
      this.navService.goToReturnNotePage(resp[0].returnNoteID);
      obs.unsubscribe();
    })
  }

  public creditRMAAndDisplayCreditNote(rmaID: number){
    let obs = this.creditService.creditRMA(rmaID).subscribe(resp =>{
      this.navService.goToInvoicePage(resp[0].creditNoteID);
      obs.unsubscribe();
    })
  }

  /*--------------------- --- Create / Update Order Detail Form Helper --- ----------------------*/
  public rmaHeaderForm: FormGroup;

  public initializeHeaderForm(id?: any): string {
    this.rmaHeaderForm = this.fb.group({
      orderID: 0,
      selectedOrderText: [null, [this.validator.basicValidation]],
    });

    let currentMode = this.determinMode(id);

    if (currentMode == Globals.MODE_UPDATE) {
      let obs = this.getByID(id).subscribe(respData => {
        obs.unsubscribe();
        this.populateFormFromModel(respData);
      })
    }

    return currentMode;
  }

  public updateSelectedOrder(newChildModel: Order) {
    this.rmaHeaderForm.controls["orderID"].setValue(newChildModel.orderID);
    this.rmaHeaderForm.controls["selectedOrderText"].setValue(newChildModel.orderID + " - " + newChildModel.customerName);
  }

  public getCreateModelFromForm(): CreateRMA {
    let newModel: CreateRMA = {
      orderHeaderID: this.rmaHeaderForm.value["orderID"]
    };
    return newModel;
  }

  private determinMode(id?: any): string {
    let returnString = "";
    if (id > 0) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: RMADetailed) {
    this.rmaHeaderForm.setValue({
      orderID: model.header.orderID,
      selectedOrderText: model.header.orderID + " - " + model.header.customerName
    });
  }

  /*--------------------- ---Order Detail Form Helper --- ----------------------*/
  public detailedRMAForm: FormGroup;

  public initializeDetailedRMAForm() {
    this.detailedRMAForm = this.fbRMADetailed.group({
      rmaID: 0,
      orderID: 0,
      customerName: '',
      rmaStatus: '',
      createdDate: new Date(),
      returnedDate: new Date(),
    });      
  }

  public populateDetailedRMAFormFromModel(model: RMADetailed, paginator: MatPaginator) {
    this.detailedRMAForm.setValue({
      rmaID: model.header.rmaID,
      orderID: model.header.orderID,
      customerName: model.header.customerName,
      rmaStatus: model.header.rmaStatusText,
      createdDate: model.header.createdDate,
      returnedDate: model.header.returnedDate,
    });
    this.detailedRMAForm.updateValueAndValidity();
    this.refreshItemListData(paginator, model.items);
  }


  /*--------------------- --- Order Preview Table Helper --- ----------------------*/
  rmaList: MatTableDataSource<RMAPreview>;
  textFilter: string = "";

  public sortTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.rmaList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.rmaID, b.rmaID, isAsc);
        case 'Order': return this.compare(a.orderID, b.orderID, isAsc);
        case 'Customer': return this.compare(a.customerName.toLowerCase(), b.customerName.toLowerCase(), isAsc);
        case 'Status': return this.compare(a.rmaStatusText.toLowerCase(), b.rmaStatusText.toLowerCase(), isAsc);
        case 'Created': return this.compare(a.createdDate.toString(), b.createdDate.toString(), isAsc);
        default: return 0;
      }
    });
    this.setupTableDataSource(sortedData, paginator);
  }

  public refreshListData(paginator: MatPaginator) {
    let obs = this.getAll().subscribe(modelResp => {
      this.setupTableDataSource(modelResp, paginator);
      obs.unsubscribe();
    })
  }

  public resetListFilter() {
    this.textFilter = "";
    this.applyListFilter();
  }

  public applyListFilter() { this.rmaList.filter = this.textFilter.trim().toLowerCase(); }

  private setupTableDataSource(data: RMAPreview[], paginator: MatPaginator) {
    this.rmaList = new MatTableDataSource(data);
    this.rmaList.paginator = paginator;
    this.rmaList.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }


  /*--------------------- --- Order Item table Helper --- ----------------------*/
  rmaItemList: MatTableDataSource<RMAItem>;

  public sortItemTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.rmaItemList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Description': return this.compare(a.orderItemDescription.toLowerCase(), b.orderItemDescription.toLowerCase(), isAsc);
        case 'Status': return this.compare(a.rmaItemStatus.toLowerCase(), b.rmaItemStatus.toLowerCase(), isAsc);
        case 'Restock': return this.compare(a.returnToInventory ? "1" : "0", a.returnToInventory ? "1" : "0", isAsc);
        case 'Reason': return this.compare(a.returnReason, b.returnReason, isAsc);
        default: return 0;
      }
    });
    this.setupItemTableDataSource(sortedData, paginator);
  }

  public refreshItemListData(paginator: MatPaginator, itemList?: RMAItem[]) {
    if(itemList){
      this.setupItemTableDataSource(itemList, paginator);
    }
    else{
      let obs = this.getItemsForRMA(this.detailedRMAForm.value["rmaID"]).subscribe(resp =>{
        this.setupItemTableDataSource(resp,paginator);
        obs.unsubscribe();
      })
      
    }
  }

  private setupItemTableDataSource(data: RMAItem[], paginator: MatPaginator) {
    this.rmaItemList = new MatTableDataSource(data);
    this.rmaItemList.paginator = paginator;
  }

  public removeRMAItemFromTable(rmaItemID: number) {
    let currentData = this.rmaItemList.data;
    let index = currentData.findIndex(x => x.orderItemID == rmaItemID)
    currentData.splice(index, 1);
    this.rmaItemList.data = currentData;
  }

  public addRMAItemToTable(newModel: RMAItem) {
    let currentData = this.rmaItemList.data;
    currentData.push(newModel);
    this.rmaItemList.data = currentData;
  }

  /*--------------------- --- Add / Edit Order Item Form Helper --- ----------------------*/
  public itemForm: FormGroup;

  public initializeItemForm(id?: any): string {
    this.itemForm = this.fb.group({
      rmaItemID: 0,
      rmaID: [this.detailedRMAForm.value["rmaID"], [this.validator.basicValidation]],
      orderItemID: [0,[this.validator.basicValidation]],
      returnQty: [0, [this.validator.basicValidation]],
      returnReason: ['', [this.validator.basicValidation]],
      returnToInventory: [false, [this.validator.compareToUnitPrice]],
      orderItemDescription: ['', [this.validator.basicValidation]],
      orderItemQty: 0
    });

    let currentMode = this.determinMode(id);

    if (currentMode == Globals.MODE_UPDATE) {
      let obs = this.getRMAItemByID(id).subscribe(respData => {
        obs.unsubscribe();
        this.populateItemFormFromModel(respData);
      })
    }

    return currentMode;
  }

  public updateSelectedItem(newChildModel: OrderItem) {
    this.itemForm.controls["orderItemID"].setValue(newChildModel.orderItemID);
    this.itemForm.controls["orderItemDescription"].setValue(newChildModel.orderItemDescription);
    this.itemForm.controls["orderItemQty"].setValue(newChildModel.orderItemQty);
  }

  public getCreateItemModelFromForm(): CreateRMAItem {
    let newModel: CreateRMAItem = {
      rmaID : this.itemForm.value["rmaID"],
      orderItemID: this.itemForm.value["orderItemID"],
      returnQty: this.itemForm.value["returnQty"],
      returnToInventory: this.itemForm.value["returnToInventory"],
      returnReason: this.itemForm.value["returnReason"]
    };
    return newModel;
  }

  public getUpdateItemModelFromForm(): UpdateRMAItem {
    let newModel: UpdateRMAItem = {
      rmaItemID: this.itemForm.value["rmaItemID"],
      returnQty: this.itemForm.value["returnQty"],
      returnToInventory: this.itemForm.value["returnToInventory"],
      returnReason: this.itemForm.value["returnReason"]
    };
    return newModel;
  }

  private populateItemFormFromModel(model: RMAItem) {
    this.itemForm.setValue({
      rmaItemID: model.rmaItemID,
      rmaID: [this.detailedRMAForm.value["rmaID"], [this.validator.basicValidation]],
      orderItemID: model.orderItemID,
      returnQty: model.returnQty,
      returnReason: model.returnReason,
      returnToInventory: model.returnToInventory,
      orderItemDescription: model.orderItemDescription,
      orderItemQty: 0 //NEED TO POPULATE THIS WITH OrderItem.OrderItemQty - OrderItem.ReturnedQty
    });
  }
}
