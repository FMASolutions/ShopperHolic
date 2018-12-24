import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductGroup } from '../../models/stock/productGroups/productGroup';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {


  baseURL: string = 'https://localhost:5001/api/ProductGroup/';
  lastCreatedProd: ProductGroup = new ProductGroup();


  constructor(private http: HttpClient, private router: Router) { }


  public createNewProduct(newProductGroup: CreateProductGroup): Observable<ProductGroup> {
    return this.http.post<ProductGroup>(this.baseURL + 'Create', newProductGroup);
  }

  public getByID(id: number): Observable<ProductGroup> {
    return this.http.get<ProductGroup>(this.baseURL + 'GetByID/?id=' + id.toString());
  }

  public getAll(): Observable<ProductGroupPreview[]> {
    return this.http.get<ProductGroupPreview[]>(this.baseURL + 'GetAll');
  }

  public update(newModel: ProductGroup): Observable<ProductGroup> {
    return this.http.put<ProductGroup>(this.baseURL + 'Update', newModel);
  }

  public delete(prodGroupID: number): Observable<boolean> {
    let urlString = this.baseURL + "Delete?id=" + prodGroupID.toString();
    return this.http.delete<boolean>(urlString);
  }

  public goToProductGroupHome(formattedStatusMessage?: string) {
    if (formattedStatusMessage) {
      this.router.navigateByUrl("/ProductGroups?" + formattedStatusMessage);
    } else {
      this.router.navigateByUrl("/ProductGroups");
    }
  }

  public goToProductGroupDetail(requestedID: number, formattedStatusMessage?: string) {
    if (formattedStatusMessage) {
      this.router.navigateByUrl("/ProductGroupDetail?id=" + requestedID.toString() + "&" + formattedStatusMessage);
    }
    else
      this.router.navigateByUrl("/ProductGroupDetail?id=" + requestedID.toString());
  }

  public goToProductGroupUpdate(requestID: number) {
    this.router.navigateByUrl("/ProductGroupUpdate?id=" + requestID);
  }
  
}