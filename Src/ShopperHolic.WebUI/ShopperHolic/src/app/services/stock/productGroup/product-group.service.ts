import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { Observable } from 'rxjs';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';
import { Globals } from 'src/globals';
import { tap } from 'rxjs/operators';
import { UserNotificationService } from '../../generic/user-notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/ProductGroup/';
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService) { }

  public createNewProduct(newProductGroup: CreateProductGroup): Observable<ProductGroup> {
    this.userNotificationService.informUserStart(Globals.PROD_GROUP_CREATE_ATTEMPT_MSG, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<ProductGroup>(this.baseURL + 'Create', newProductGroup).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.PROD_GROUP_CREATE_SUCCESS_MSG);
    }, err => {
      this.userNotificationService.informUserError(Globals.PROD_GROUP_CREATE_FAILED_MSG);
    }));
  }

  public getByID(id: number): Observable<ProductGroup> {
    this.userNotificationService.informUserStart(Globals.PROD_GROUP_READ_ATTEMPT_MSG, Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ProductGroup>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.PROD_GROUP_READ_SUCCESS_MSG);
    }, err => {
      this.userNotificationService.informUserError(Globals.PROD_GROUP_READ_FAILED_MSG);
    }));;
  }

  public getAll(): Observable<ProductGroupPreview[]> {
    this.userNotificationService.informUserStart(Globals.PROD_GROUP_READ_ATTEMPT_MSG,Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ProductGroupPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.PROD_GROUP_READ_SUCCESS_MSG);
    }, err => {
      this.userNotificationService.informUserError(Globals.PROD_GROUP_READ_FAILED_MSG);
    }));
  }

  public update(newModel: ProductGroup): Observable<ProductGroup> {
    this.userNotificationService.informUserStart(Globals.PROD_GROUP_UPDATE_ATTEMPT_MSG + newModel.productGroupID,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<ProductGroup>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.PROD_GROUP_UPDATE_SUCCESS_MSG + resp.productGroupID);
    }, err => {
      this.userNotificationService.informUserError(Globals.PROD_GROUP_UPDATE_FAILED_MSG + newModel.productGroupID);
    }));
  }

  public delete(prodGroupID: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.PROD_GROUP_DELETE_ATTEMPT_MSG + prodGroupID,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + prodGroupID.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.PROD_GROUP_DELETE_SUCCESS_MSG + prodGroupID);
    }, err => {
      this.userNotificationService.informUserError(Globals.PROD_GROUP_DELETE_FAILED_MSG + prodGroupID);
    }));
  }
}
