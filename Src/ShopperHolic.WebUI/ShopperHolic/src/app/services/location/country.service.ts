import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericValidator } from '../generic/generic-validator';
import { CreateCountry } from 'src/app/models/location/countries/createCountry';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/location/countries/country';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/Country/';
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: GenericValidator,) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateCountry): Observable<Country> {
    this.userNotificationService.informUserStart(Globals.COUNTRY_CREATE_ATTEMPT_MSG + newModel.countryCode, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<Country>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.COUNTRY_CREATE_SUCCESS_MSG + newModel.countryCode);
    }, err => {
      this.userNotificationService.informUserError(Globals.COUNTRY_CREATE_FAILED_MSG + newModel.countryCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<Country> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<Country>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.COUNTRY_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<Country[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<Country[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.COUNTRY_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: Country): Observable<Country> {
    this.userNotificationService.informUserStart(Globals.COUNTRY_UPDATE_ATTEMPT_MSG + newModel.countryID,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<Country>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.COUNTRY_UPDATE_SUCCESS_MSG + resp.countryID);
    }, err => {
      this.userNotificationService.informUserError(Globals.COUNTRY_UPDATE_FAILED_MSG + newModel.countryID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.COUNTRY_DELETE_ATTEMPT_MSG + id,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.COUNTRY_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.COUNTRY_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
      console.log(err.error);
    }));
  }

  /*--------------------- --- Country Popup Helper --- ----------------------*/
  public countryForm: FormGroup;

  public InitializeForm(id?: any) : string{
    this.countryForm = this.fb.group({
      id: [0, []],
      code: [null, [this.validator.validateCodeForCreate]],
      name: [null, [this.validator.basicValidation]],
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

  public getUpdateModelFromForm(): Country {
    let newModel: Country = {
      countryID: this.countryForm.value["id"],
      countryCode: this.countryForm.value["code"],
      countryName: this.countryForm.value["name"]
    } 
    return newModel;
  }

  public getCreateModelFromForm(): CreateCountry{
    let newModel: CreateCountry = {
      countryCode: this.countryForm.value["code"],
      countryName: this.countryForm.value["name"]
    };
    return newModel;
  }

  private determinMode(id?: any) : string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: Country) {
    this.countryForm.setValue({
      id: model.countryID, 
      code: model.countryCode,
      name: model.countryName,
    });
  }
}
