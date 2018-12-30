import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { Observable } from 'rxjs';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';
import { Globals } from 'src/globals';
import { LoadingSpinnerService } from '../../generic/loading-spinner.service';
import { StatusMessageService } from '../../generic/status-message.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/ProductGroup/';
  constructor(private http: HttpClient, private spinner: LoadingSpinnerService, private sms: StatusMessageService) { }

  public createNewProduct(newProductGroup: CreateProductGroup): Observable<ProductGroup> {
    this.informUserStart(Globals.PROD_GROUP_CREATE_ATTEMPT_MSG, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<ProductGroup>(this.baseURL + 'Create', newProductGroup).pipe(tap(resp => {
      this.informUserComplete(Globals.PROD_GROUP_CREATE_SUCCESS_MSG);
    }, err => {
      this.informUserError(Globals.PROD_GROUP_CREATE_FAILED_MSG);
    }));
  }

  public getByID(id: number): Observable<ProductGroup> {
    this.informUserStart(Globals.PROD_GROUP_READ_ATTEMPT_MSG, Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ProductGroup>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.informUserComplete(Globals.PROD_GROUP_READ_SUCCESS_MSG);
    }, err => {
      this.informUserError(Globals.PROD_GROUP_READ_FAILED_MSG);
    }));;
  }

  public getAll(): Observable<ProductGroupPreview[]> {
    this.informUserStart(Globals.PROD_GROUP_READ_ATTEMPT_MSG,Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ProductGroupPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.informUserComplete(Globals.PROD_GROUP_READ_SUCCESS_MSG);
    }, err => {
      this.informUserError(Globals.PROD_GROUP_READ_FAILED_MSG);
    }));
  }

  public update(newModel: ProductGroup): Observable<ProductGroup> {
    this.informUserStart(Globals.PROD_GROUP_UPDATE_ATTEMPT_MSG + newModel.productGroupID,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<ProductGroup>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.informUserComplete(Globals.PROD_GROUP_UPDATE_SUCCESS_MSG + resp.productGroupID);
    }, err => {
      this.informUserError(Globals.PROD_GROUP_UPDATE_FAILED_MSG + newModel.productGroupID);
    }));
  }

  public delete(prodGroupID: number): Observable<boolean> {
    this.informUserStart(Globals.PROD_GROUP_DELETE_ATTEMPT_MSG + prodGroupID,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + prodGroupID.toString()).pipe(tap(resp => {
      this.informUserComplete(Globals.PROD_GROUP_DELETE_SUCCESS_MSG + prodGroupID);
    }, err => {
      this.informUserError(Globals.PROD_GROUP_DELETE_FAILED_MSG + prodGroupID);
    }));
  }

  private informUserError(userMessage: string){
    this.sms.setDangerMessage(userMessage);
    this.spinner.closeAllSpinners();
  }

  private informUserStart(userMessage: string, spinnerMessage: string){
    this.sms.setInfoMessage(userMessage);
    this.spinner.openNewSpinner(spinnerMessage);
  }

  private informUserComplete(userMessage: string){
    this.sms.setSuccessMessage(userMessage);
    this.spinner.closeAllSpinners();
  }

}
