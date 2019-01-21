import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericValidator } from '../generic/generic-validator';
import { CreateUserAccount } from 'src/app/models/accounts/userAccounts/createUserAccounts';
import { UserAccount } from 'src/app/models/accounts/userAccounts/userAccount';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAccountPreview } from 'src/app/models/accounts/userAccounts/userAccountPreview';
import { MatTableDataSource, MatPaginator, Sort } from '@angular/material';
import { UserRole } from 'src/app/models/accounts/userAccounts/userRole';
import { UserDetailed } from 'src/app/models/accounts/userAccounts/userDetailed';
import { SupplierLogin } from 'src/app/models/security/supplierLogin';
import { CustomerLogin } from 'src/app/models/security/customerLogin';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/User/';
  availableUserRoles: UserRole[];
  currentUserID: number = 0;

  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: GenericValidator) {
    let obs = this.getAvailableUserRoles().subscribe(resp => {
      this.availableUserRoles = resp;
      obs.unsubscribe();
    })
  }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateUserAccount): Observable<UserAccount> {
    this.userNotificationService.informUserStart(Globals.USER_CREATE_ATTEMPT_MSG + newModel.username, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<UserAccount>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.USER_CREATE_SUCCESS_MSG + resp.username);
    }, err => {
      this.userNotificationService.informUserError(Globals.USER_CREATE_FAILED_MSG + newModel.username);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<UserAccount> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<UserAccount>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.USER_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<UserAccountPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<UserAccountPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.USER_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: UserAccount): Observable<UserAccount> {
    this.userNotificationService.informUserStart(Globals.USER_UPDATE_ATTEMPT_MSG + newModel.username, Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<UserAccount>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.USER_UPDATE_SUCCESS_MSG + resp.username);
    }, err => {
      this.userNotificationService.informUserError(Globals.USER_UPDATE_FAILED_MSG + newModel.username);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.USER_DELETE_ATTEMPT_MSG + id, Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.USER_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.USER_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getAvailableUserRoles(): Observable<UserRole[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<UserRole[]>(this.baseURL + 'GetAvailableRoles').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(err.error);
    }))
  }

  public getUserDetailed(id: number): Observable<UserDetailed> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<UserDetailed>(this.baseURL + 'GetDetailedUser/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.USER_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public addCustomerLogin(userID: number, customerID: number): Observable<CustomerLogin> {
    this.userNotificationService.informUserStartSpinnerOnly("Creating Customer Login");
    return this.http.get<CustomerLogin>(this.baseURL + 'AddCustomerLogin/?userID=' + userID.toString() + '&CustomerID=' + customerID.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public addSupplierLogin(userID: number, supplierID: number): Observable<SupplierLogin> {
    this.userNotificationService.informUserStartSpinnerOnly("Creating Supplier Login");
    return this.http.get<SupplierLogin>(this.baseURL + 'AddSupplierLogin/?userID=' + userID.toString() + '&SupplierID=' + supplierID.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public removeCustomerLogin(userID: number, customerID: number): Observable<boolean> {
    this.userNotificationService.informUserStartSpinnerOnly("Removing Customer Login");
    return this.http.get<boolean>(this.baseURL + 'RemoveCustomerLogin/?userID=' + userID.toString() + '&CustomerID=' + customerID.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public removeSupplierLogin(userID: number, supplierID: number): Observable<boolean> {
    this.userNotificationService.informUserStartSpinnerOnly("Removing Supplier Login");
    return this.http.get<boolean>(this.baseURL + 'RemoveSupplierLogin/?userID=' + userID.toString() + '&SupplierID=' + supplierID.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  /*--------------------- --- Form Helper --- ----------------------*/
  public userForm: FormGroup;

  public InitializeForm(id?: any, customerPageinator?: MatPaginator, supplierPaginator?: MatPaginator): string {
    
    let currentMode = this.determinMode(id);

    if (currentMode == Globals.MODE_UPDATE) {
      this.setupFormForUpdate();
      this.currentUserID = id;
      let obs = this.getUserDetailed(id).subscribe(respData => {
        obs.unsubscribe();
        this.populateFormFromModel(respData);
        this.refreshSupplierListData(supplierPaginator, respData.supplierLogins);
        this.refreshCustomerListData(customerPageinator, respData.customerLogins);
      })
    }
    else{
      this.setupFormForCreate();
    }

    return currentMode;
  }

  public getUpdateModelFromForm(): UserAccount {
    let newModel: UserAccount = {
      userID: this.userForm.value["id"],
      username: this.userForm.value["username"],
      emailAddress: this.userForm.value["emailAddress"],
      password: this.userForm.value["password"],
      knownAs: this.userForm.value["knownAs"],
      userRoleTypeID: this.userForm.value["selectedRole"]
    }
    return newModel;
  }

  public getCreateModelFromForm(): CreateUserAccount {
    let newModel: CreateUserAccount = {
      username: this.userForm.value["username"],
      emailAddress: this.userForm.value["emailAddress"],
      password: this.userForm.value["password"],
      knownAs: this.userForm.value["knownAs"],
      userRoleTypeID: this.userForm.value["selectedRole"]
    };
    return newModel;
  }

  private setupFormForUpdate(){
    this.userForm = this.fb.group({
      id: [0, []],
      username: [null, [this.validator.basicValidation,this.validator.minLength3]],
      emailAddress: [null, [this.validator.basicValidation]],
      password: "",
      confirmPassword: "",
      knownAs: [null, [this.validator.basicValidation]],
      updateCurrentPassword: false,
      selectedRole: [null, [this.validator.basicValidation]]
    }, { validator: this.validator.checkPasswords});
  }

  private setupFormForCreate(){
    this.userForm = this.fb.group({
      id: [0, []],
      username: [null, [this.validator.basicValidation,this.validator.minLength3]],
      emailAddress: [null, [this.validator.basicValidation]],
      password: ["", [this.validator.basicValidation, this.validator.minLength3]],
      confirmPassword: "",
      knownAs: [null, [this.validator.basicValidation]],
      updateCurrentPassword: false,
      selectedRole: [null, [this.validator.basicValidation]]
    }, { validator: this.validator.checkPasswords});
  }

  private determinMode(id?: any): string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: UserDetailed) {
    this.userForm.setValue({
      id: model.userID,
      username: model.username,
      emailAddress: model.emailAddress,
      password: "",
      confirmPassword: "",
      knownAs: model.knownAs,
      selectedRole: model.userRoleTypeID,
      updateCurrentPassword: false
    });
  }

  /*--------------------- --- Table Helper --- ----------------------*/
  tableDataSource: MatTableDataSource<UserAccountPreview>;
  textFilter: string = "";

  public sortTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.tableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.userID, b.userID, isAsc);
        case 'Name': return this.compare(a.username.toLowerCase(), b.username.toLowerCase(), isAsc);
        case 'Email': return this.compare(a.emailAddress.toLowerCase(), b.emailAddress.toLowerCase(), isAsc);
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

  public applyListFilter() { this.tableDataSource.filter = this.textFilter.trim().toLowerCase(); }

  private setupTableDataSource(data: UserAccountPreview[], paginator: MatPaginator) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }




  /*--------------------- --- Supplier Helper --- ----------------------*/
  supplierTableDataSource: MatTableDataSource<SupplierLogin>;
  supplierTextFilter: string = "";

  public sortSupplierTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.supplierTableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.supplierID, b.supplierID, isAsc);
        case 'Code': return this.compare(a.supplierCode.toLowerCase(), b.supplierCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.supplierName.toLowerCase(), b.supplierName.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.setupSupplierTableDataSource(sortedData, paginator);
  }

  public refreshSupplierListData(paginator: MatPaginator, logins: SupplierLogin[]) {
    this.setupSupplierTableDataSource(logins, paginator);
  }

  public resetSupplierListFilter() {
    this.supplierTextFilter = "";
    this.applySupplierListFilter();
  }

  public applySupplierListFilter() { this.tableDataSource.filter = this.textFilter.trim().toLowerCase(); }

  public removeSupplierForCurrentUser(supplierID: number) {
    let obs = this.removeSupplierLogin(this.currentUserID, supplierID).subscribe(resp => {
      let index = this.supplierTableDataSource.data.findIndex(x => x.supplierID == supplierID);
      this.supplierTableDataSource.data.splice(index);
      this.supplierTableDataSource = new MatTableDataSource(this.supplierTableDataSource.data);
      obs.unsubscribe();
    })
  }

  public addSupplierForCurrentUser(newSupplierLogin: SupplierLogin) {
    let obs = this.addSupplierLogin(this.currentUserID, newSupplierLogin.supplierID).subscribe(resp =>{
      obs.unsubscribe
      this.supplierTableDataSource.data.push(newSupplierLogin);
      this.supplierTableDataSource = new MatTableDataSource(this.supplierTableDataSource.data);
    })
  }

  private setupSupplierTableDataSource(data: SupplierLogin[], paginator: MatPaginator) {
    this.supplierTableDataSource = new MatTableDataSource(data);
    this.supplierTableDataSource.paginator = paginator;
    this.supplierTableDataSource.filter = this.supplierTextFilter;
  }

  /*--------------------- --- Customer Helper --- ----------------------*/
  customerTableDataSource: MatTableDataSource<CustomerLogin>;
  customerTextFilter: string = "";

  public sortCustomerTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.customerTableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.customerID, b.customerID, isAsc);
        case 'Code': return this.compare(a.customerCode.toLowerCase(), b.customerCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.customerName.toLowerCase(), b.customerName.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.setupCustomerTableDataSource(sortedData, paginator);
  }

  public refreshCustomerListData(paginator: MatPaginator, logins: CustomerLogin[]) {
    this.setupCustomerTableDataSource(logins, paginator);
  }

  public resetCustomerListFilter() {
    this.customerTextFilter = "";
    this.applyCustomerListFilter();
  }

  public applyCustomerListFilter() { this.tableDataSource.filter = this.textFilter.trim().toLowerCase(); }

  public removeCustomerForCurrentUser(customerID: number) {
    let obs = this.removeCustomerLogin(this.currentUserID, customerID).subscribe(resp => {
      let index = this.customerTableDataSource.data.findIndex(x => x.customerID == customerID);
      this.customerTableDataSource.data.splice(index);
      this.customerTableDataSource = new MatTableDataSource(this.customerTableDataSource.data);
      obs.unsubscribe();
    })
  }
  
  public addCustomerForCurrentUser(newLogin: CustomerLogin) {
    let obs = this.addCustomerLogin(this.currentUserID, newLogin.customerID).subscribe(resp =>{
      obs.unsubscribe
      this.customerTableDataSource.data.push(newLogin);
      this.customerTableDataSource = new MatTableDataSource(this.customerTableDataSource.data);
    })
  }

  private setupCustomerTableDataSource(data: CustomerLogin[], paginator: MatPaginator) {
    this.customerTableDataSource = new MatTableDataSource(data);
    this.customerTableDataSource.paginator = paginator;
    this.customerTableDataSource.filter = this.customerTextFilter;
  }
}