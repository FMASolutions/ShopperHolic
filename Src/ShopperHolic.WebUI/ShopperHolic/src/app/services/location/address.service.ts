import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericValidator } from '../generic/generic-validator';
import { CreateAddress } from 'src/app/models/location/addresses/createAddress';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/location/addresses/address';
import { tap } from 'rxjs/operators';
import { AddressPreview } from 'src/app/models/location/addresses/addressPreview';
import { CityArea } from 'src/app/models/location/cityAreas/cityArea';
import { MatTableDataSource, Sort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/Address/';
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: GenericValidator) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateAddress): Observable<Address> {
    this.userNotificationService.informUserStart(Globals.ADDRESS_CREATE_ATTEMPT_MSG + newModel.postCode, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<Address>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ADDRESS_CREATE_SUCCESS_MSG + resp.addressID);
    }, err => {
      this.userNotificationService.informUserError(Globals.ADDRESS_CREATE_FAILED_MSG + newModel.postCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<Address> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<Address>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.ADDRESS_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<AddressPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<AddressPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      console.log(resp);
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.ADDRESS_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: Address): Observable<Address> {
    this.userNotificationService.informUserStart(Globals.ADDRESS_UPDATE_ATTEMPT_MSG + newModel.addressID,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<Address>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ADDRESS_UPDATE_SUCCESS_MSG + resp.addressID);
    }, err => {
      this.userNotificationService.informUserError(Globals.ADDRESS_UPDATE_FAILED_MSG + newModel.addressID);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.ADDRESS_DELETE_ATTEMPT_MSG + id,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ADDRESS_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.ADDRESS_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  /*--------------------- --- SubGroup Group Popup Helper --- ----------------------*/
  public addressForm: FormGroup;

  public InitializeForm(id?: any) : string{
    this.addressForm = this.fb.group({
      id: [0, []],
      postCode: [null, [this.validator.postCodeValidator]],
      addressLine1: [null, [this.validator.basicValidation]],
      addressLine2: [null, [this.validator.basicValidation]],
      cityAreaID: [null, [this.validator.basicValidation]],
      cityAreaText: [null, [this.validator.basicValidation]]
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

  public getUpdateModelFromForm(): Address {
    let newModel: Address = {
      addressID: this.addressForm.value["id"],
      postCode: this.addressForm.value["postCode"],
      addressLine1: this.addressForm.value["addressLine1"],
      addressLine2: this.addressForm.value["addressLine2"],
      cityAreaID: this.addressForm.value["cityAreaID"],
      cityAreaText: this.addressForm.value["cityAreaText"]
    } 
    return newModel;
  }
  public updateSelectedCityArea(newChildModel: CityArea){
    this.addressForm.controls["cityAreaID"].setValue(newChildModel.cityAreaID);
    this.addressForm.controls["cityAreaText"].setValue(newChildModel.cityAreaID + " - " + newChildModel.cityAreaCode + " - " + newChildModel.cityAreaName);

  }

  public getCreateModelFromForm(): CreateAddress{
    let newModel: CreateAddress = {
      addressLine1: this.addressForm.value["addressLine1"],
      addressLine2: this.addressForm.value["addressLine2"],
      postCode: this.addressForm.value["postCode"],
      cityAreaID: this.addressForm.value["cityAreaID"]
    };
    return newModel;
  }

  private determinMode(id?: any) : string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: Address) {
    this.addressForm.setValue({
      id: model.addressID,
      postCode: model.postCode,
      addressLine1: model.addressLine1,
      addressLine2: model.addressLine2,
      cityAreaID: model.cityAreaID,
      cityAreaText: model.cityAreaText
    });
  }

  /*--------------------- --- Address Table Helper --- ----------------------*/
  tableDataSource: MatTableDataSource<AddressPreview>;
  textFilter: string = "";

  public sortTableData(sort: Sort, paginator: MatPaginator){
    const data = this.tableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.addressID, b.addressID, isAsc);
        case 'Line1': return this.compare(a.addressLine1.toLowerCase(), b.addressLine1.toLowerCase(), isAsc);
        case 'Line2': return this.compare(a.addressLine2.toLowerCase(), b.addressLine2.toLowerCase(), isAsc);
        case 'CityAreaName': return this.compare(a.cityAreaName.toLowerCase(), b.cityAreaName.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.setupTableDataSource(sortedData, paginator);
  }

  public refreshListData(paginator: MatPaginator){
    let obs = this.getAll().subscribe(modelResp => {
      console.log(modelResp);
      this.setupTableDataSource(modelResp, paginator);
      obs.unsubscribe();
    })        
  }

  public resetListFilter(){
    this.textFilter = "";
    this.applyListFilter();
  }

  public applyListFilter() { this.tableDataSource.filter = this.textFilter.trim().toLowerCase(); }

  private setupTableDataSource(data: AddressPreview[], paginator: MatPaginator) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }
}