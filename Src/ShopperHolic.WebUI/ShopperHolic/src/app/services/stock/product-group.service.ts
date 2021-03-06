import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { Observable } from 'rxjs';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';
import { Globals } from 'src/globals';
import { tap } from 'rxjs/operators';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GenericValidator } from '../generic/generic-validator';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {
  
  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/ProductGroup/';
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: GenericValidator,) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateProductGroup): Observable<ProductGroup> {
    this.userNotificationService.informUserStart(Globals.PROD_GROUP_CREATE_ATTEMPT_MSG + newModel.productGroupCode, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<ProductGroup>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.PROD_GROUP_CREATE_SUCCESS_MSG + resp.productGroupID);
    }, err => {
      this.userNotificationService.informUserError(Globals.PROD_GROUP_CREATE_FAILED_MSG + newModel.productGroupCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<ProductGroup> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ProductGroup>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.PROD_GROUP_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<ProductGroupPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ProductGroupPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.PROD_GROUP_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: ProductGroup): Observable<ProductGroup> {
    this.userNotificationService.informUserStart(Globals.PROD_GROUP_UPDATE_ATTEMPT_MSG + newModel.productGroupID,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<ProductGroup>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.PROD_GROUP_UPDATE_SUCCESS_MSG + resp.productGroupID);
    }, err => {
      this.userNotificationService.informUserError(Globals.PROD_GROUP_UPDATE_FAILED_MSG + newModel.productGroupID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.PROD_GROUP_DELETE_ATTEMPT_MSG + id,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.PROD_GROUP_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.PROD_GROUP_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  /*--------------------- --- Create / Update Form Helper --- ----------------------*/
  public prodForm: FormGroup;

  public InitializeForm(id?: any) : string{
    this.prodForm = this.fb.group({
      id: [0, []],
      code: [null, [this.validator.validateCodeForCreate]],
      name: [null, [this.validator.basicValidation]],
      desc: [null, [this.validator.basicValidation]],
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

  public getUpdateModelFromForm(): ProductGroup {
    let newModel: ProductGroup = {
      productGroupID: this.prodForm.value["id"],
      productGroupCode: this.prodForm.value["code"],
      productGroupName: this.prodForm.value["name"],
      productGroupDescription: this.prodForm.value["desc"]
    } 
    return newModel;
  }

  public getCreateModelFromForm(): CreateProductGroup{
    let newModel: CreateProductGroup = {
      productGroupCode: this.prodForm.value["code"],
      productGroupName: this.prodForm.value["name"],
      productGroupDescription: this.prodForm.value["desc"]
    };
    return newModel;
  }

  private determinMode(id?: any) : string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: ProductGroup) {
    this.prodForm.setValue({
      id: model.productGroupID,
      code: model.productGroupCode,
      name: model.productGroupName,
      desc: model.productGroupDescription
    });
  }

  /*--------------------- --- List / Selector View Helper --- ----------------------*/
  tableDataSource: MatTableDataSource<ProductGroupPreview>;
  textFilter: string = "";

  public sortTableData(sort: Sort, paginator: MatPaginator){
    const data = this.tableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.productGroupID, b.productGroupID, isAsc);
        case 'Code': return this.compare(a.productGroupCode.toLowerCase(), b.productGroupCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.productGroupName.toLowerCase(), b.productGroupName.toLowerCase(), isAsc);
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

  private setupTableDataSource(data: ProductGroupPreview[], paginator: MatPaginator) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }
}


