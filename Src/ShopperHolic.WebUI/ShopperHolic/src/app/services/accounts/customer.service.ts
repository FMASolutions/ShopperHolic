import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericValidator } from '../generic/generic-validator';
import { CreateCustomer } from 'src/app/models/accounts/customers/createCustomer';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/accounts/customers/customer';
import { tap } from 'rxjs/operators';
import { CustomerPreview } from 'src/app/models/accounts/customers/customerPreview';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';
import { CustomerType } from 'src/app/models/accounts/customers/customerType';
import { Address } from 'src/app/models/location/addresses/address';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/Customer/';
  public customerTypes: CustomerType[];
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: GenericValidator) { 
    let obs = this.getCustomerTypes().subscribe(resp =>{
      this.customerTypes = resp;
      obs.unsubscribe();
    });
  }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateCustomer): Observable<Customer> {
    this.userNotificationService.informUserStart(Globals.CUSTOMER_CREATE_ATTEMPT_MSG + newModel.customerCode, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<Customer>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.CUSTOMER_CREATE_SUCCESS_MSG + resp.customerCode);
    }, err => {
      this.userNotificationService.informUserError(Globals.CUSTOMER_CREATE_FAILED_MSG + newModel.customerCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<Customer> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<Customer>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.CUSTOMER_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<CustomerPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<CustomerPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.CUSTOMER_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: Customer): Observable<Customer> {
    this.userNotificationService.informUserStart(Globals.CUSTOMER_UPDATE_ATTEMPT_MSG + newModel.customerID,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<Customer>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.CUSTOMER_UPDATE_SUCCESS_MSG + resp.customerID);
    }, err => {
      this.userNotificationService.informUserError(Globals.CUSTOMER_UPDATE_FAILED_MSG + newModel.customerID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.CUSTOMER_DELETE_ATTEMPT_MSG + id,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.CUSTOMER_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.CUSTOMER_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getCustomerTypes(): Observable<CustomerType[]>{
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<CustomerType[]>(this.baseURL + 'GetCustomerTypes').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.CUSTOMER_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }))
  }
  
  /*--------------------- --- Create / Update Form Helper --- ----------------------*/
  public customerForm: FormGroup;
  
  public InitializeForm(id?: any) : string{
    this.customerForm = this.fb.group({
      id: [0, []],
      code: [null, [this.validator.validateCodeForCreate]],
      name: [null, [this.validator.basicValidation]],
      tel: [null, [this.validator.basicValidation]],
      email: [null, [this.validator.basicValidation]],
      selectedCustomerType: [0, [this.validator.basicValidation]],
      defaultAddress: [null, [this.validator.basicValidation]],
      defaultAddressText: [null, [this.validator.basicValidation]]
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

  public getUpdateModelFromForm(): Customer {
    this.customerTypes.forEach(t => {t.customerTypeName})
    let newModel: Customer = {
      customerID: this.customerForm.value["id"],
      customerCode: this.customerForm.value["code"],
      customerName: this.customerForm.value["name"],
      customerContactNumber: this.customerForm.value["tel"],
      customerEmailAddress: this.customerForm.value["email"],
      customerTypeID: this.customerForm.value["selectedCustomerType"],
      customerTypeText: "Not Used For Update",
      defaultAddressID: this.customerForm.value["defaultAddress"],
      defaultAddressText: this.customerForm.value["defaultAddressText"]
    }
    return newModel;
  }

  public updateSelectedDefaultAddress(newChildModel: Address){
    this.customerForm.controls["defaultAddress"].setValue(newChildModel.addressID);
    this.customerForm.controls["defaultAddressText"].setValue(newChildModel.addressLine1 + " - " + newChildModel.addressLine2);
  }

  public getCreateModelFromForm(): CreateCustomer{
    let newModel: CreateCustomer = {
      customerCode: this.customerForm.value["code"],
      customerName: this.customerForm.value["name"],
      customerContactNumber: this.customerForm.value["tel"],
      customerEmailAddress: this.customerForm.value["email"],
      customerTypeID: this.customerForm.value["selectedCustomerType"],
      defaultAddressID: this.customerForm.value["defaultAddress"]
    };
    return newModel;
  }

  private determinMode(id?: any) : string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: Customer) {
    this.customerForm.setValue({
      id: model.customerID,
      code: model.customerCode,
      name: model.customerName,
      tel: model.customerContactNumber,
      email: model.customerEmailAddress,
      selectedCustomerType: model.customerTypeID,
      defaultAddress: model.defaultAddressID,
      defaultAddressText: model.defaultAddressText
    });
  }

  /*--------------------- --- List / Selector View Helper --- ----------------------*/
  tableDataSource: MatTableDataSource<CustomerPreview>;
  textFilter: string = "";

  public sortTableData(sort: Sort, paginator: MatPaginator){
    const data = this.tableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.customerID, b.customerID, isAsc);
        case 'Code': return this.compare(a.customerCode.toLowerCase(), b.customerCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.customerName.toLowerCase(), b.customerName.toLowerCase(), isAsc);
        case 'Tel': return this.compare(a.customerContactNumber.toLowerCase(), b.customerContactNumber.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.setupTableDataSource(sortedData, paginator);
  }
  
  public refreshListData(paginator: MatPaginator){
    let obs = this.getAll().subscribe(modelResp => {
      this.setupTableDataSource(modelResp, paginator);
      obs.unsubscribe();
    }) 
  }

  public resetListFilter(){
    this.textFilter = "";
    this.applyListFilter();
  }

  public applyListFilter() { this.tableDataSource.filter = this.textFilter.trim().toLowerCase(); }

  private setupTableDataSource(data: CustomerPreview[], paginator: MatPaginator) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }
}