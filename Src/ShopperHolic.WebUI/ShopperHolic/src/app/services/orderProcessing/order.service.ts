import { Injectable } from '@angular/core';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';
import { OrderPreview } from 'src/app/models/orderProcessing/orders/orderPreview';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericValidator } from '../generic/generic-validator';
import { CreateOrder } from 'src/app/models/orderProcessing/orders/createOrder';
import { OrderDetailed } from 'src/app/models/orderProcessing/orders/orderDetailed';
import { Globals } from 'src/globals';
import { tap } from 'rxjs/operators';
import { UpdateOrder } from 'src/app/models/orderProcessing/orders/updateOrder';
import { Customer } from 'src/app/models/accounts/customers/customer';
import { Address } from 'src/app/models/location/addresses/address';
import { OrderItem } from 'src/app/models/orderProcessing/orders/orderItem';
import { CreateOrderItem } from 'src/app/models/orderProcessing/orders/createOrderItem';
import { Item } from 'src/app/models/stock/items/item';
import { UpdateOrderItem } from 'src/app/models/orderProcessing/orders/updateOrderItem';
import { AppNavigationService } from '../generic/app-navigation.service';
import { DeliveryNoteService } from './delivery-note.service';
import { InvoiceService } from './invoice.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/Order/';

  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, 
    private fbOrderDetailed: FormBuilder, private validator: GenericValidator, private navService: AppNavigationService, 
    private delService: DeliveryNoteService, private invoiceService: InvoiceService) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateOrder): Observable<OrderDetailed> {
    this.userNotificationService.informUserStart(Globals.ORDER_CREATE_ATTEMPT_MSG + newModel.orderDate, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<OrderDetailed>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ORDER_CREATE_SUCCESS_MSG + resp.header.orderID);
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_CREATE_FAILED_MSG + newModel.orderDate);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<OrderDetailed> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<OrderDetailed>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<OrderPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<OrderPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.SUB_GROUP_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: UpdateOrder): Observable<OrderDetailed> {
    this.userNotificationService.informUserStart(Globals.ORDER_UPDATE_ATTEMPT_MSG + newModel.orderID, Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<OrderDetailed>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ORDER_UPDATE_SUCCESS_MSG + resp.header.orderID);
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_UPDATE_FAILED_MSG + newModel.orderID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.ORDER_DELETE_ATTEMPT_MSG + id, Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ORDER_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getOrderItemByID(orderItemID: number): Observable<OrderItem> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<OrderItem>(this.baseURL + 'GetOrderItemByID?orderItemID=' + orderItemID.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }))
  }

  public getItemsForOrder(id: number): Observable<OrderItem[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<OrderItem[]>(this.baseURL + 'GetItemsForOrder?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }))
  }

  public addItemToOrder(model: CreateOrderItem): Observable<OrderItem> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.ORDER_ITEM_CREATE_ATTEMPT_MSG + model.orderItemDescription);
    return this.http.post<OrderItem>(this.baseURL + 'AddItemToOrder', model).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_ITEM_CREATE_FAILED_MSG + model.orderItemDescription);
      this.userNotificationService.informUserError(err.error);
    }))
  }

  public updateOrderItem(model: UpdateOrderItem): Observable<OrderItem> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.ORDER_ITEM_UPDATE_ATTEMPT_MSG + model.orderItemDescription);
    return this.http.put<OrderItem>(this.baseURL + 'UpdateOrderItem', model).pipe(tap(() => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_ITEM_UPDATE_FAILED_MSG + model.orderItemDescription);
      this.userNotificationService.informUserError(err.error);
    }))
  }

  public removeItemFromOrder(orderItemID: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.ORDER_ITEM_DELETE_ATTEMPT_MSG + orderItemID, Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "RemoveItemFromOrder?orderItemID=" + orderItemID.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ORDER_ITEM_DELETE_SUCCESS_MSG + orderItemID);
    }, err => {
      this.userNotificationService.informUserError(Globals.ORDER_ITEM_DELETE_FAILED_MSG + orderItemID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public deliverOrderAndDisplayDeliveryNote(orderID: number){
    let obs = this.delService.deliverOrder(orderID).subscribe(resp =>{
      this.navService.goToDeliveryNotePage(resp[0].deliveryNoteID);
      obs.unsubscribe();
    })
  }

  public invoiceOrderAndDisplayInvoice(orderID: number){
    let obs = this.invoiceService.invoiceOrder(orderID).subscribe(resp =>{
      this.navService.goToInvoicePage(resp[0].invoiceID);
      obs.unsubscribe();
    })
  }


  /*--------------------- --- Create / Update Order Detail Form Helper --- ----------------------*/
  public orderHeaderForm: FormGroup;

  public initializeHeaderForm(id?: any): string {
    this.orderHeaderForm = this.fb.group({
      orderID: 0,
      customerID: [null, [this.validator.basicValidation]],
      customerText: null,
      addressID: [null, [this.validator.basicValidation]],
      addressText: null,
      orderDate: [null, [this.validator.basicValidation]],
      deliveryDate: [null, [this.validator.basicValidation]],
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

  public updateSelectedCustomer(newChildModel: Customer) {
    this.orderHeaderForm.controls["customerID"].setValue(newChildModel.customerID);
    this.orderHeaderForm.controls["customerText"].setValue(newChildModel.customerID + " - " + newChildModel.customerCode + " - " + newChildModel.customerName);
  }

  public updateSelectedAddress(newChildModel: Address) {
    this.orderHeaderForm.controls["addressID"].setValue(newChildModel.addressID);
    this.orderHeaderForm.controls["addressText"].setValue(newChildModel.addressLine1 + " - " + newChildModel.addressLine2 + " - " + newChildModel.postCode);
  }

  public getCreateModelFromForm(): CreateOrder {
    let newModel: CreateOrder = {
      customerID: this.orderHeaderForm.value["customerID"],
      addressID: this.orderHeaderForm.value["addressID"],
      orderDate: this.orderHeaderForm.value["orderDate"],
      deliveryDate: this.orderHeaderForm.value["deliveryDate"]
    };
    return newModel;
  }


  public getUpdateModelFromForm(): UpdateOrder {
    let newModel: UpdateOrder = {
      orderID: this.orderHeaderForm.value["orderID"],
      customerID: this.orderHeaderForm.value["customerID"],
      addressID: this.orderHeaderForm.value["addressID"],
      orderDate: this.orderHeaderForm.value["orderDate"],
      deliveryDate: this.orderHeaderForm.value["deliveryDate"]
    };
    return newModel;
  }

  private determinMode(id?: any): string {
    let returnString = "";
    if (id > 0) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: OrderDetailed) {
    this.orderHeaderForm.setValue({
      orderID: model.header.orderID,
      customerID: model.header.customerID,
      customerText: model.header.customerName,
      addressID: model.header.addressID,
      addressText: model.header.addressLine1 + ' - ' + model.header.addressLine2 + ' - ' + model.header.cityAreaName,
      orderDate: model.header.orderDate,
      deliveryDate: model.header.deliveryDate,
    });
  }

  /*--------------------- ---Order Detail Form Helper --- ----------------------*/
  public detailedOrderForm: FormGroup;

  public initalizeDetailedOrderForm() {
    this.detailedOrderForm = this.fbOrderDetailed.group({
      orderID: 0,
      customerID: 0,
      customerName: '',
      orderStatus: '',
      addressID: 0,
      addressLine1: '',
      addressLine2: '',
      cityArea: '',
      city: '',
      postCode: '',
      country: '',
      orderDate: new Date(),
      deliveryDate: new Date(),
    });      
  }

  public populateDetailedOrderFormFromModel(model: OrderDetailed, paginator: MatPaginator) {
    this.detailedOrderForm.setValue({
      orderID: model.header.orderID,
      customerID: model.header.customerID,
      customerName: model.header.customerName,
      orderStatus: model.header.orderStatusText,
      addressID: model.header.addressID,
      addressLine1: model.header.addressLine1,
      addressLine2: model.header.addressLine2,
      cityArea: model.header.cityAreaName,
      city: model.header.cityName,
      postCode: model.header.postCode,
      country: model.header.countryName,
      orderDate: model.header.orderDate,
      deliveryDate: model.header.deliveryDate,
    });
    this.detailedOrderForm.updateValueAndValidity();
    this.refreshItemListData(paginator, model.items);
  }


  /*--------------------- --- Order Preview Table Helper --- ----------------------*/
  orderList: MatTableDataSource<OrderPreview>;
  textFilter: string = "";

  public sortTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.orderList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.orderID, b.orderID, isAsc);
        case 'Customer': return this.compare(a.customerName.toLowerCase(), b.customerName.toLowerCase(), isAsc);
        case 'Status': return this.compare(a.orderStatusText.toLowerCase(), b.orderStatusText.toLowerCase(), isAsc);
        case 'DeliveryDate': return this.compare(a.deliveryDate.toString(), b.deliveryDate.toString(), isAsc);
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

  public applyListFilter() { this.orderList.filter = this.textFilter.trim().toLowerCase(); }

  private setupTableDataSource(data: OrderPreview[], paginator: MatPaginator) {
    this.orderList = new MatTableDataSource(data);
    this.orderList.paginator = paginator;
    this.orderList.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }


  /*--------------------- --- Order Item table Helper --- ----------------------*/
  orderItemList: MatTableDataSource<OrderItem>;

  public sortItemTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.orderItemList.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Name': return this.compare(a.orderItemDescription.toLowerCase(), b.orderItemDescription.toLowerCase(), isAsc);
        case 'Price': return this.compare(a.orderItemUnitPriceAfterDiscount, b.orderItemUnitPriceAfterDiscount, isAsc);
        case 'Qty': return this.compare(a.orderItemQty, b.orderItemQty, isAsc);
        default: return 0;
      }
    });
    this.setupItemTableDataSource(sortedData, paginator);
  }

  public refreshItemListData(paginator: MatPaginator, itemList?: OrderItem[]) {
    if(itemList){
      this.setupItemTableDataSource(itemList, paginator);
    }
    else{
      let obs = this.getItemsForOrder(this.detailedOrderForm.value["orderID"]).subscribe(resp =>{
        this.setupItemTableDataSource(resp,paginator);
        obs.unsubscribe();
      })
      
    }
  }

  private setupItemTableDataSource(data: OrderItem[], paginator: MatPaginator) {
    this.orderItemList = new MatTableDataSource(data);
    this.orderItemList.paginator = paginator;
  }

  public removeOrderItemFromTable(orderItemID: number) {
    let currentData = this.orderItemList.data;
    let index = currentData.findIndex(x => x.orderItemID == orderItemID)
    currentData.splice(index, 1);
    this.orderItemList.data = currentData;
  }

  public addOrderItemToTable(newModel: OrderItem) {
    let currentData = this.orderItemList.data;
    currentData.push(newModel);
    this.orderItemList.data = currentData;
  }

  /*--------------------- --- Add / Edit Order Item Form Helper --- ----------------------*/
  public itemForm: FormGroup;

  public initializeItemForm(id?: any): string {
    this.itemForm = this.fb.group({
      orderItemID: 0,
      orderID: [this.detailedOrderForm.value["orderID"], [this.validator.basicValidation]],
      itemID: [0, [this.validator.basicValidation]],
      orderItemUnitPrice: 0.00,
      orderItemUnitPriceAfterDiscount: [0.00, [this.validator.compareToUnitPrice]],
      orderItemQty: [0, [this.validator.basicValidation]],
      orderItemDescription: ['', [this.validator.basicValidation]],
    });

    let currentMode = this.determinMode(id);

    if (currentMode == Globals.MODE_UPDATE) {
      let obs = this.getOrderItemByID(id).subscribe(respData => {
        obs.unsubscribe();
        this.populateItemFormFromModel(respData);
      })
    }

    return currentMode;
  }

  public updateSelectedItem(newChildModel: Item) {
    this.itemForm.controls["itemID"].setValue(newChildModel.itemID);
    this.itemForm.controls["orderItemDescription"].setValue(newChildModel.itemDescription);
    this.itemForm.controls["orderItemUnitPrice"].setValue(newChildModel.itemUnitPriceWithMaxDiscount);
    this.itemForm.controls["orderItemUnitPriceAfterDiscount"].setValue(newChildModel.itemUnitPrice);
  }

  public getCreateItemModelFromForm(): CreateOrderItem {
    let newModel: CreateOrderItem = {
      orderID: this.itemForm.value["orderID"],
      itemID: this.itemForm.value["itemID"],
      orderItemUnitPrice: this.itemForm.value["orderItemUnitPrice"],
      orderItemUnitPriceAfterDiscount: this.itemForm.value["orderItemUnitPriceAfterDiscount"],
      orderItemQty: this.itemForm.value["orderItemQty"],
      orderItemDescription: this.itemForm.value["orderItemDescription"]
    };
    return newModel;
  }

  public getUpdateItemModelFromForm(): UpdateOrderItem {
    let newModel: UpdateOrderItem = {
      orderItemID: this.itemForm.value["orderItemID"],
      itemID: this.itemForm.value["itemID"],
      orderItemUnitPrice: this.itemForm.value["orderItemUnitPrice"],
      orderItemUnitPriceAfterDiscount: this.itemForm.value["orderItemUnitPriceAfterDiscount"],
      orderItemQty: this.itemForm.value["orderItemQty"],
      orderItemDescription: this.itemForm.value["orderItemDescription"]
    };
    return newModel;
  }

  private populateItemFormFromModel(model: OrderItem) {
    this.itemForm.setValue({
      orderItemID: model.orderItemID,
      orderID: model.orderID,
      itemID: model.itemID,
      orderItemUnitPrice: model.orderItemUnitPrice,
      orderItemUnitPriceAfterDiscount: model.orderItemUnitPriceAfterDiscount,
      orderItemQty: model.orderItemQty,
      orderItemDescription: model.orderItemDescription
    });
  }

}
