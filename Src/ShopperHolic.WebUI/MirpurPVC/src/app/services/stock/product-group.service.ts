import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductGroup } from '../../models/stock/productGroups/productGroup';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {

  
  baseURL: string = 'https://localhost:5001/api/ProductGroup/';
  lastCreatedProd: ProductGroup = new ProductGroup();


  constructor(private http: HttpClient) {
  }


  public createNewProduct(newProductGroup: CreateProductGroup): Observable<ProductGroup> {
    return this.http.post<ProductGroup>(this.baseURL + 'Create', newProductGroup).pipe(tap(this.prodCreatedResp, this.apiErrorHandler));
  }

  public getByID(id: number): Observable<ProductGroup> {
    return this.http.get<ProductGroup>(this.baseURL + 'GetByID/?id=' + id.toString());
  }

  public getAll(): Observable<ProductGroupPreview[]> {
    return this.http.get<ProductGroupPreview[]>(this.baseURL + 'GetAll');
  }

  public update(newModel: ProductGroup): Observable<ProductGroup> {
    return this.http.put<ProductGroup>(this.baseURL + 'Update', newModel).pipe(tap(this.prodUpdatedResp, this.apiErrorHandler));
  }

  public delete(prodGroupID: number): Observable<boolean> {
    let urlString = this.baseURL + "Delete?id=" + prodGroupID.toString();
    return this.http.delete<boolean>(urlString).pipe(tap(this.prodDeleteResp, this.apiErrorHandler));
  }

  private prodCreatedResp(prodResp: ProductGroup) {
    if (this.lastCreatedProd) { Object.assign(this.lastCreatedProd, prodResp); }
    else this.lastCreatedProd = prodResp;
  }

  private prodUpdatedResp(prodResp: ProductGroup) {
    //TODO Not sure if I even need to have these response functions......
  }

  private prodDeleteResp(wasSuccessfull: boolean) {

  }

  private apiErrorHandler(error: HttpErrorResponse) {
    console.log(error);
  }
}