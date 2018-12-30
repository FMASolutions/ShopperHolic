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
  previewsFromServer: ProductGroupPreview[] = [];

  constructor(private http: HttpClient, private spinner: LoadingSpinnerService, private sms: StatusMessageService) { }

  public createNewProduct(newProductGroup: CreateProductGroup): Observable<ProductGroup> {
    return this.http.post<ProductGroup>(this.baseURL + 'Create', newProductGroup);
  }

  public getByID(id: number): Observable<ProductGroup> {
    return this.http.get<ProductGroup>(this.baseURL + 'GetByID/?id=' + id.toString());
  }

  public getAll(): Observable<ProductGroupPreview[]> {
    return this.http.get<ProductGroupPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp=>{
      this.previewsFromServer = resp;
    }));
  }

  public update(newModel: ProductGroup): Observable<ProductGroup> {
    return this.http.put<ProductGroup>(this.baseURL + 'Update', newModel);
  }

  public delete(prodGroupID: number): Observable<boolean> {
    this.sms.setWarningMessage(Globals.PROD_GROUP_DELETE_ATTEMPT_MSG + prodGroupID);

    let obs = this.http.delete<boolean>(this.baseURL + "Delete?id=" + prodGroupID.toString());
    obs.subscribe(response => {
      this.sms.setSuccessMessage(Globals.PROD_GROUP_DELETE_SUCCESS_MSG + prodGroupID);
    }, error => {
      this.sms.setDangerMessage(error.error);
      this.sms.setDangerMessage(Globals.PROD_GROUP_DELETE_FAILED_MSG + prodGroupID);
    })
    return obs;
  }

}
