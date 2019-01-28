import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericValidator } from '../generic/generic-validator';
import { CreateCity } from 'src/app/models/location/cities/createCity';
import { City } from 'src/app/models/location/cities/city';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CityPreview } from 'src/app/models/location/cities/cityPreview';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';
import { Country } from 'src/app/models/location/countries/country';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/City/';
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: GenericValidator) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateCity): Observable<City> {
    this.userNotificationService.informUserStart(Globals.CITY_CREATE_ATTEMPT_MSG + newModel.cityCode, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<City>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.CITY_CREATE_SUCCESS_MSG + resp.cityCode);
    }, err => {
      this.userNotificationService.informUserError(Globals.CITY_CREATE_FAILED_MSG + newModel.cityCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<City> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<City>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.CITY_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<CityPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<CityPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.CITY_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: City): Observable<City> {
    this.userNotificationService.informUserStart(Globals.CITY_UPDATE_ATTEMPT_MSG + newModel.cityID,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<City>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.CITY_UPDATE_SUCCESS_MSG + resp.cityID);
    }, err => {
      this.userNotificationService.informUserError(Globals.CITY_UPDATE_FAILED_MSG + newModel.cityID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.CITY_DELETE_ATTEMPT_MSG + id,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.CITY_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.CITY_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  /*--------------------- --- Create / Update Form Helper --- ----------------------*/
  public cityForm: FormGroup;

  public InitializeForm(id?: any) : string{
    this.cityForm = this.fb.group({
      id: [0, []],
      code: [null, [this.validator.validateCodeForCreate]],
      name: [null, [this.validator.basicValidation]],
      countryID: [null, [this.validator.basicValidation]],
      countryText: [null, [this.validator.basicValidation]]
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

  public getUpdateModelFromForm(): City {
    let newModel: City = {
      cityID: this.cityForm.value["id"],
      cityCode: this.cityForm.value["code"],
      cityName: this.cityForm.value["name"],
      countryID: this.cityForm.value["countryID"],
      countryText: this.cityForm.value["countryText"]
    }
    return newModel;
  }
  public updateSelectedCountry(newChildModel: Country){
    this.cityForm.controls["countryID"].setValue(newChildModel.countryID);
    this.cityForm.controls["countryText"].setValue(newChildModel.countryID + " - " + newChildModel.countryCode + " - " + newChildModel.countryName);
  }

  public getCreateModelFromForm(): CreateCity{
    let newModel: CreateCity = {
      cityCode: this.cityForm.value["code"],
      cityName: this.cityForm.value["name"],
      countryID: this.cityForm.value["countryID"]
    };
    return newModel;
  }

  private determinMode(id?: any) : string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: City) {
    this.cityForm.setValue({
      id: model.cityID,
      code: model.cityCode,
      name: model.cityName,
      countryID: model.countryID,
      countryText: model.countryText
    });
  }

  /*--------------------- --- List / Selector View Helper --- ----------------------*/
  tableDataSource: MatTableDataSource<CityPreview>;
  textFilter: string = "";

  public sortTableData(sort: Sort, paginator: MatPaginator){
    const data = this.tableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.cityID, b.cityID, isAsc);
        case 'Code': return this.compare(a.cityCode.toLowerCase(), b.cityCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.cityName.toLowerCase(), b.cityName.toLowerCase(), isAsc);
        case 'CID': return this.compare(a.countryID, b.countryID, isAsc);
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

  private setupTableDataSource(data: CityPreview[], paginator: MatPaginator) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }
}
