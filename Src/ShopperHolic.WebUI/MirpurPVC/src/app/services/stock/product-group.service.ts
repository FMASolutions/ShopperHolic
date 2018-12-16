import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductGroup } from '../../models/stock/productGroups/productGroup';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {
 
  baseURL: string = 'https://localhost:5001/api/ProductGroup/';
  lastCreatedProd: ProductGroup = new ProductGroup();

  constructor(private http: HttpClient) {
  }


  public createNewProduct(newProductGroup: CreateProductGroup): Observable<ProductGroup> {
    return this.http.post<ProductGroup>(this.baseURL + 'Create', newProductGroup).pipe(tap(this.prodCreatedResp,this.apiErrorHandler));
  }

  public getByID(id: number) : Observable<ProductGroup>{
    return this.http.get<ProductGroup>(this.baseURL + 'GetByID/?id=' + id.toString());
  }

  public generateNavBarParameters(prod: ProductGroup) : string{
    let returnString: string = "?id=" + prod.productGroupID.toString();
    returnString += "&code=" + prod.productGroupCode;
    returnString += "&name=" + prod.productGroupName;
    returnString += "&desc=" + prod.productGroupDescription;
    return returnString;
  }

  public populateFromNavBarParameters(snapShot: ActivatedRouteSnapshot, prodGroup: ProductGroup)
  {
    //TODO SMARTER THSI UP AND IMPLEMENT THE SEARCH BY ID TO POPULATE WHEN PARTIAL PARAMETERS PASSED (ID).....
    if(snapShot.queryParamMap.get('id').toString()){
      prodGroup.productGroupID = parseInt(snapShot.queryParamMap.get('id').toString()); 
    }
    if(snapShot.queryParamMap.get('code').toString()){
      prodGroup.productGroupCode = snapShot.queryParamMap.get('code');
    }
    if(snapShot.queryParamMap.get('name').toString()){
      prodGroup.productGroupName = snapShot.queryParamMap.get('name');
    }
    if(snapShot.queryParamMap.get('desc').toString()){
      prodGroup.productGroupDescription = snapShot.queryParamMap.get('desc'); 
    }
  }


  private prodCreatedResp(prodResp: ProductGroup){
    if(this.lastCreatedProd){ Object.assign(this.lastCreatedProd,prodResp);}
    else this.lastCreatedProd = prodResp;
  }

  private apiErrorHandler(error: HttpErrorResponse){
    console.log(error);
  }
}