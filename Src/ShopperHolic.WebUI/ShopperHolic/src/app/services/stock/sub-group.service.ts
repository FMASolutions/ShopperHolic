import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateSubGroup } from 'src/app/models/stock/subGroups/createSubGroup';
import { SubGroup } from 'src/app/models/stock/subGroups/subGroup';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SubGroupPreview } from 'src/app/models/stock/subGroups/subGroupPreview';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { GenericValidator } from '../generic/generic-validator';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SubGroupService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/SubGroup/';
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: GenericValidator,) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateSubGroup): Observable<SubGroup> {
    this.userNotificationService.informUserStart(Globals.SUB_GROUP_CREATE_ATTEMPT_MSG + newModel.subGroupCode, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<SubGroup>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.SUB_GROUP_CREATE_SUCCESS_MSG + resp.subGroupID);
    }, err => {
      this.userNotificationService.informUserError(Globals.SUB_GROUP_CREATE_FAILED_MSG + newModel.subGroupCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<SubGroup> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<SubGroup>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.SUB_GROUP_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<SubGroupPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<SubGroupPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.SUB_GROUP_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: SubGroup): Observable<SubGroup> {
    this.userNotificationService.informUserStart(Globals.SUB_GROUP_UPDATE_ATTEMPT_MSG + newModel.subGroupID,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<SubGroup>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.SUB_GROUP_UPDATE_SUCCESS_MSG + resp.subGroupID);
    }, err => {
      this.userNotificationService.informUserError(Globals.SUB_GROUP_UPDATE_FAILED_MSG + newModel.subGroupID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.SUB_GROUP_DELETE_ATTEMPT_MSG + id,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.SUB_GROUP_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.SUB_GROUP_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);      
    }));
  }

  /*--------------------- --- Create / Update Form Helper --- ----------------------*/
  public subForm: FormGroup;

  public InitializeForm(id?: any) : string{
    this.subForm = this.fb.group({
      id: [0, []],
      code: [null, [this.validator.validateCodeForCreate]],
      name: [null, [this.validator.basicValidation]],
      desc: [null, [this.validator.basicValidation]],
      prodID: [null, [this.validator.basicValidation]],
      prodText: [null, [this.validator.basicValidation]]
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

  public getUpdateModelFromForm(): SubGroup {
    let newModel: SubGroup = {
      subGroupID: this.subForm.value["id"],
      subGroupCode: this.subForm.value["code"],
      subGroupName: this.subForm.value["name"],
      subGroupDescription: this.subForm.value["desc"],
      productGroupID: this.subForm.value["prodID"],
      productGroupText: this.subForm.value["prodText"]
    } 
    return newModel;
  }
  public updateSelectedProductGroup(newChildModel: ProductGroup){
    this.subForm.controls["prodID"].setValue(newChildModel.productGroupID);
    this.subForm.controls["prodText"].setValue(newChildModel.productGroupID + " - " + newChildModel.productGroupCode + " - " + newChildModel.productGroupName);

  }

  public getCreateModelFromForm(): CreateSubGroup{
    let newModel: CreateSubGroup = {
      subGroupCode: this.subForm.value["code"],
      subGroupName: this.subForm.value["name"],
      subGroupDescription: this.subForm.value["desc"],
      productGroupID: this.subForm.value["prodID"]
    };
    return newModel;
  }

  private determinMode(id?: any) : string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: SubGroup) {
    this.subForm.setValue({
      id: model.subGroupID,
      code: model.subGroupCode,
      name: model.subGroupName,
      desc: model.subGroupDescription,
      prodID: model.productGroupID,
      prodText: model.productGroupText
    });
  }

  /*--------------------- --- List / Selector View Helper --- ----------------------*/
  tableDataSource: MatTableDataSource<SubGroupPreview>;
  textFilter: string = "";

  public sortTableData(sort: Sort, paginator: MatPaginator){
    const data = this.tableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.subGroupID, b.subGroupID, isAsc);
        case 'Code': return this.compare(a.subGroupCode.toLowerCase(), b.subGroupCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.subGroupName.toLowerCase(), b.subGroupName.toLowerCase(), isAsc);
        case 'PID': return this.compare(a.productGroupID, b.productGroupID, isAsc);
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

  private setupTableDataSource(data: SubGroupPreview[], paginator: MatPaginator) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }
}
