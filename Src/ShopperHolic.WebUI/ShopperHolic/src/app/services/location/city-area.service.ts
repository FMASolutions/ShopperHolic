import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericValidator } from '../generic/generic-validator';
import { CreateCityArea } from 'src/app/models/location/cityAreas/createCityArea';
import { Observable } from 'rxjs';
import { CityArea } from 'src/app/models/location/cityAreas/cityArea';
import { tap } from 'rxjs/operators';
import { CityAreaPreview } from 'src/app/models/location/cityAreas/cityAreaPreview';
import { City } from 'src/app/models/location/cities/city';

@Injectable({
  providedIn: 'root'
})
export class CityAreaService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/CityArea/';
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: GenericValidator,) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateCityArea): Observable<CityArea> {
    this.userNotificationService.informUserStart(Globals.CITYAREA_CREATE_ATTEMPT_MSG + newModel.cityAreaCode, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<CityArea>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.CITYAREA_CREATE_SUCCESS_MSG + resp.cityAreaCode);
    }, err => {
      this.userNotificationService.informUserError(Globals.CITYAREA_CREATE_FAILED_MSG + newModel.cityAreaCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<CityArea> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<CityArea>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.CITYAREA_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<CityAreaPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<CityAreaPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.CITYAREA_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: CityArea): Observable<CityArea> {
    this.userNotificationService.informUserStart(Globals.CITYAREA_UPDATE_ATTEMPT_MSG + newModel.cityAreaID,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<CityArea>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.CITYAREA_UPDATE_SUCCESS_MSG + resp.cityAreaID);
    }, err => {
      this.userNotificationService.informUserError(Globals.CITYAREA_UPDATE_FAILED_MSG + newModel.cityAreaID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.CITYAREA_DELETE_ATTEMPT_MSG + id,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.CITYAREA_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.CITYAREA_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  /*--------------------- --- SubGroup Group Popup Helper --- ----------------------*/
  public cityAreaForm: FormGroup;

  public InitializeForm(id?: any) : string{
    this.cityAreaForm = this.fb.group({
      id: [0, []],
      code: [null, [this.validator.validateCodeForCreate]],
      name: [null, [this.validator.basicValidation]],
      cityID: [null, [this.validator.basicValidation]],
      cityText: [null, [this.validator.basicValidation]]
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

  public getUpdateModelFromForm(): CityArea {
    let newModel: CityArea = {
      cityAreaID: this.cityAreaForm.value["id"],
      cityAreaCode: this.cityAreaForm.value["code"],
      cityAreaName: this.cityAreaForm.value["name"],
      cityID: this.cityAreaForm.value["cityID"],
      cityText: this.cityAreaForm.value["cityText"]
    } 
    return newModel;
  }
  public updateSelectedCity(newChildModel: City){
    this.cityAreaForm.controls["cityID"].setValue(newChildModel.cityID);
    this.cityAreaForm.controls["cityText"].setValue(newChildModel.cityID + " - " + newChildModel.cityCode + " - " + newChildModel.cityName);
  }

  public getCreateModelFromForm(): CreateCityArea{
    let newModel: CreateCityArea = {
      cityAreaCode: this.cityAreaForm.value["code"],
      cityAreaName: this.cityAreaForm.value["name"],
      cityID: this.cityAreaForm.value["prodID"]
    };
    return newModel;
  }

  private determinMode(id?: any) : string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: CityArea) {
    this.cityAreaForm.setValue({
      id: model.cityAreaID,
      code: model.cityAreaCode,
      name: model.cityAreaName,
      cityID: model.cityID,
      cityText: model.cityText
    });
  }
}
