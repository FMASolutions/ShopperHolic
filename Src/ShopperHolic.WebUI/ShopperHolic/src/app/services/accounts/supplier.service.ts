import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericValidator } from '../generic/generic-validator';
import { CreateSupplier } from 'src/app/models/accounts/suppliers/createSupplier';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/models/accounts/suppliers/supplier';
import { tap } from 'rxjs/operators';
import { SupplierPreview } from 'src/app/models/accounts/suppliers/supplierPreview';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/Supplier/';
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: GenericValidator) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateSupplier): Observable<Supplier> {
    this.userNotificationService.informUserStart(Globals.SUPPLIER_CREATE_ATTEMPT_MSG + newModel.supplierCode, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<Supplier>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.SUPPLIER_CREATE_SUCCESS_MSG + resp.supplierCode);
    }, err => {
      this.userNotificationService.informUserError(Globals.SUPPLIER_CREATE_FAILED_MSG + newModel.supplierCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<Supplier> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<Supplier>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.SUPPLIER_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<SupplierPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<SupplierPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.SUPPLIER_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: Supplier): Observable<Supplier> {
    this.userNotificationService.informUserStart(Globals.SUPPLIER_UPDATE_ATTEMPT_MSG + newModel.supplierID,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<Supplier>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.SUPPLIER_UPDATE_SUCCESS_MSG + resp.supplierID);
    }, err => {
      this.userNotificationService.informUserError(Globals.SUPPLIER_UPDATE_FAILED_MSG + newModel.supplierID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.SUPPLIER_DELETE_ATTEMPT_MSG + id,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.SUPPLIER_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.SUPPLIER_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  /*--------------------- --- Create / Update Form Helper --- ----------------------*/
  public supplierForm: FormGroup;

  public InitializeForm(id?: any) : string{
    this.supplierForm = this.fb.group({
      id: [0, []],
      code: [null, [this.validator.validateCodeForCreate]],
      name: [null, [this.validator.basicValidation]],
      tel: [null, [this.validator.basicValidation]],
      email: [null, [this.validator.basicValidation]]
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

  public getUpdateModelFromForm(): Supplier {
    let newModel: Supplier = {
      supplierID: this.supplierForm.value["id"],
      supplierCode: this.supplierForm.value["code"],
      supplierName: this.supplierForm.value["name"],
      supplierContactNumber: this.supplierForm.value["tel"],
      supplierEmailAddress: this.supplierForm.value["email"]
    }
    return newModel;
  }

  public getCreateModelFromForm(): CreateSupplier{
    let newModel: CreateSupplier = {
      supplierCode: this.supplierForm.value["code"],
      supplierName: this.supplierForm.value["name"],
      supplierContactNumber: this.supplierForm.value["tel"],
      supplierEmailAddress: this.supplierForm.value["email"]
    };
    return newModel;
  }

  private determinMode(id?: any) : string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: Supplier) {
    this.supplierForm.setValue({
      id: model.supplierID,
      code: model.supplierCode,
      name: model.supplierName,
      tel: model.supplierContactNumber,
      email: model.supplierEmailAddress
    });
  }

  /*--------------------- --- List / Selector View Helper --- ----------------------*/
  tableDataSource: MatTableDataSource<SupplierPreview>;
  textFilter: string = "";

  public sortTableData(sort: Sort, paginator: MatPaginator){
    const data = this.tableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.supplierID, b.supplierID, isAsc);
        case 'Code': return this.compare(a.supplierCode.toLowerCase(), b.supplierCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.supplierName.toLowerCase(), b.supplierName.toLowerCase(), isAsc);
        case 'Tel': return this.compare(a.supplierContactNumber.toLowerCase(), b.supplierContactNumber.toLowerCase(), isAsc);
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

  private setupTableDataSource(data: SupplierPreview[], paginator: MatPaginator) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }
}
