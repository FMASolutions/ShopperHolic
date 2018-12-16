import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductGroup } from '../../models/stock/productGroups/productGroup';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { AuthenticatedUserModel } from 'src/app/models/security/authenticatedUserModel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../security/auth.service';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {
  baseURL: string = 'https://localhost:5001/api/ProductGroup/';
  lastCreatedProduct: ProductGroup = new ProductGroup();

  constructor(private http: HttpClient) {
  }

  public createNewProduct(newProductGroup: CreateProductGroup): Observable<ProductGroup> {
    return this.http.post<ProductGroup>(this.baseURL + 'Create', newProductGroup).pipe(tap(this.productGroupCreated,this.errorHandler));
  }

  private productGroupCreated(productGroupResp: ProductGroup){
    console.log("insie product group created resp handler... resp value = ");
    console.log(productGroupResp);
    if(this.lastCreatedProduct){ Object.assign(this.lastCreatedProduct,productGroupResp);}
    else this.lastCreatedProduct = productGroupResp;
    console.log("finished assigning product");
  }
  errorHandler(error: HttpErrorResponse){
    console.log("in error handler, error =");
    console.log(error);
    console.log("error message=");
    console.log(error.message);
  }
}