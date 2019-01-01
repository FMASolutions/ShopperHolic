import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubGroupValidator } from './sub-group-validator';
import { CreateSubGroup } from 'src/app/models/stock/subGroups/createSubGroup';
import { SubGroup } from 'src/app/models/stock/subGroups/subGroup';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SubGroupPreview } from 'src/app/models/stock/subGroups/subGroupPreview';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';

@Injectable({
  providedIn: 'root'
})
export class SubGroupService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/SubGroup/';
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private sgValidator: SubGroupValidator,) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNewSubGroup(newSubGroup: CreateSubGroup): Observable<SubGroup> {
    this.userNotificationService.informUserStart(Globals.SUB_GROUP_CREATE_ATTEMPT_MSG, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<SubGroup>(this.baseURL + 'Create', newSubGroup).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.SUB_GROUP_CREATE_SUCCESS_MSG);
    }, err => {
      this.userNotificationService.informUserError(Globals.SUB_GROUP_CREATE_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<SubGroup> {
    this.userNotificationService.informUserStart(Globals.SUB_GROUP_READ_ATTEMPT_MSG, Globals.SPINNER_GET_MESSAGE);
    return this.http.get<SubGroup>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.SUB_GROUP_READ_SUCCESS_MSG);
    }, err => {
      this.userNotificationService.informUserError(Globals.SUB_GROUP_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<SubGroupPreview[]> {
    this.userNotificationService.informUserStart(Globals.SUB_GROUP_READ_ATTEMPT_MSG,Globals.SPINNER_GET_MESSAGE);
    return this.http.get<SubGroupPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.SUB_GROUP_READ_SUCCESS_MSG);
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

  public delete(subGroupID: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.SUB_GROUP_DELETE_ATTEMPT_MSG + subGroupID,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + subGroupID.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.SUB_GROUP_DELETE_SUCCESS_MSG + subGroupID);
    }, err => {
      this.userNotificationService.informUserError(Globals.SUB_GROUP_DELETE_FAILED_MSG + subGroupID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  /*--------------------- --- SubGroup Group Popup Helper --- ----------------------*/
  public subForm: FormGroup;

  public InitializeForm(id?: any) : string{
    this.subForm = this.fb.group({
      id: [0, []],
      code: [null, [this.sgValidator.validateCodeForCreate]],
      name: [null, [this.sgValidator.basicValidation]],
      desc: [null, [this.sgValidator.basicValidation]],
      prodID: [null, [this.sgValidator.validateProdID]],
      prodText: [null, [this.sgValidator.basicValidation]]
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
    let newSubGroup: SubGroup = {
      subGroupID: this.subForm.value["id"],
      subGroupCode: this.subForm.value["code"],
      subGroupName: this.subForm.value["name"],
      subGroupDescription: this.subForm.value["desc"],
      productGroupID: this.subForm.value["prodID"],
      productGroupText: this.subForm.value["prodText"]
    } 
    return newSubGroup;
  }
  public updateSelectedProductGroup(selectedProd: ProductGroup){
    this.subForm.controls["prodID"].setValue(selectedProd.productGroupID);
    this.subForm.controls["prodText"].setValue(selectedProd.productGroupID + " - " + selectedProd.productGroupCode + " - " + selectedProd.productGroupName);

  }

  public getCreateModelFromForm(): CreateSubGroup{
    let newSubGroup: CreateSubGroup = {
      subGroupCode: this.subForm.value["code"],
      subGroupName: this.subForm.value["name"],
      subGroupDescription: this.subForm.value["desc"],
      productGroupID: this.subForm.value["prodID"]
    };
    return newSubGroup;
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
  
}
