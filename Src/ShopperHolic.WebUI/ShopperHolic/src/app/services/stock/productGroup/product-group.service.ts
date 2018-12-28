import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { Observable } from 'rxjs';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {
  
  baseURL: string = 'https://localhost:5001/api/ProductGroup/';

  constructor(private http: HttpClient) { }

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
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + prodGroupID.toString());
  }
  
}
