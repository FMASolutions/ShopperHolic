import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../generic/user-notification.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CreateItem } from 'src/app/models/stock/items/createItem';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/stock/items/item';
import { tap } from 'rxjs/operators';
import { ItemPreview } from 'src/app/models/stock/items/itemPreview';
import { SubGroup } from 'src/app/models/stock/subGroups/subGroup';
import { GenericValidator } from '../generic/generic-validator';
import { MatTableDataSource, MatPaginator, Sort } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/Item/';
  imageLocationPrefix: string = Globals.APP_SETTINGS.BASE_API_URL + "/uploads/";

  imageSrc: string = "";

  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: GenericValidator, ) { }

  /*--------------------- --- API CALLS --- ----------------------*/
  public createNew(newModel: CreateItem): Observable<Item> {
    this.userNotificationService.informUserStart(Globals.ITEM_CREATE_ATTEMPT_MSG + newModel.itemCode, Globals.SPINNER_CREATE_MESSAGE);
    return this.http.post<Item>(this.baseURL + 'Create', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ITEM_CREATE_SUCCESS_MSG + resp.itemCode);
    }, err => {
      this.userNotificationService.informUserError(Globals.ITEM_CREATE_FAILED_MSG + newModel.itemCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public getByID(id: number): Observable<Item> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<Item>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.ITEM_READ_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<ItemPreview[]> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ItemPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.closeSpinners();
    }, err => {
      this.userNotificationService.informUserError(Globals.ITEM_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: Item): Observable<Item> {
    this.userNotificationService.informUserStart(Globals.ITEM_UPDATE_ATTEMPT_MSG + newModel.itemCode, Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<Item>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ITEM_UPDATE_SUCCESS_MSG + resp.itemCode);
    }, err => {
      this.userNotificationService.informUserError(Globals.ITEM_UPDATE_FAILED_MSG + newModel.itemCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.ITEM_DELETE_ATTEMPT_MSG + id, Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ITEM_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.ITEM_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public imageUpload(uploadFile: File, id: number): Observable<string> {
    this.userNotificationService.informUserStartSpinnerOnly(Globals.SPINNER_UPLOAD_MESSAGE);
    const formData = new FormData();
    formData.append(uploadFile.name, uploadFile);
    formData.append("id", id.toString());
    return this.http.post<string>(this.baseURL + 'UploadImage', formData).pipe(tap(() => {
      this.userNotificationService.closeSpinners();
    }, (error) => {
      this.userNotificationService.informUserError(error.error);
    }))
  }

  /*--------------------- --- Create / Update Form Helper --- ----------------------*/
  public itemForm: FormGroup;
  public currentItemIsFeatured: boolean = false;

  public initializeForm() {
    this.itemForm = this.fb.group({
      id: [0, []],
      code: [null, [this.validator.validateCodeForCreate]],
      name: [null, [this.validator.basicValidation]],
      desc: [null, [this.validator.basicValidation]],
      subID: [null, [this.validator.basicValidation]],
      subText: [null, [this.validator.basicValidation]],
      unitPrice: [null, [this.validator.basicValidation]],
      unitPriceAD: [null, [this.validator.basicValidation]],
      availableQty: [null, [this.validator.basicValidation]],
      reorderQty: [null, [this.validator.basicValidation]],
    });
  }

  public determinModeAndPopulateForm(currentImageElement: any, id?: any): string {
    let currentMode = this.determinMode(id);

    if (currentMode == Globals.MODE_UPDATE) {
      let obs = this.getByID(id).subscribe(respData => {
        obs.unsubscribe();
        this.populateFormFromModel(respData);
        let r = Math.random().toString(36).substring(7); //Use random characters for query string so the browser can't cache the image
        this.imageSrc = this.imageLocationPrefix + respData.itemImageFilename + "?" + r;
        currentImageElement.nativeElement.src = this.imageSrc;
      })
    }

    return currentMode;
  }

  public newFileSelected(newFile: File, currentImageElement: any) {

    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result.toString();
      currentImageElement.nativeElement.src = this.imageSrc;
    }
    reader.readAsDataURL(newFile);
  }

  public getUpdateModelFromForm(): Item {
    let newModel: Item = {
      itemID: this.itemForm.value["id"],
      subGroupID: this.itemForm.value["subID"],
      isFeaturedItem: this.currentItemIsFeatured,
      itemCode: this.itemForm.value["code"],
      subGroupText: this.itemForm.value["subText"],
      itemName: this.itemForm.value["name"],
      itemDescription: this.itemForm.value["desc"],
      itemUnitPrice: this.itemForm.value["unitPrice"],
      itemUnitPriceWithMaxDiscount: this.itemForm.value["unitPriceAD"],
      itemReorderQtyReminder: this.itemForm.value["reorderQty"],
      itemAvailableQty: this.itemForm.value["availableQty"],
      itemImageFilename: "N/A" //This value isn't used when Updating a record, updates to the image are done trhough the api image upload.
    }
    return newModel;
  }

  public getCreateModelFromForm(): CreateItem {
    let newModel: CreateItem = {
      subGroupID: this.itemForm.value["subID"],
      itemCode: this.itemForm.value["code"],
      isFeaturedItem: this.currentItemIsFeatured,
      itemName: this.itemForm.value["name"],
      itemDescription: this.itemForm.value["desc"],
      itemUnitPrice: this.itemForm.value["unitPrice"],
      itemUnitPriceWithMaxDiscount: this.itemForm.value["unitPriceAD"],
      itemReorderQtyReminder: this.itemForm.value["reorderQty"],
      itemAvailableQty: this.itemForm.value["availableQty"],
    };
    return newModel;
  }

  public updateSelectedSubGroup(newChildModel: SubGroup) {
    this.itemForm.controls["subID"].setValue(newChildModel.subGroupID);
    this.itemForm.controls["subText"].setValue(newChildModel.subGroupID + " - " + newChildModel.subGroupCode + " - " + newChildModel.subGroupName);
  }



  private determinMode(id?: any): string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: Item) {
    this.currentItemIsFeatured = model.isFeaturedItem;
    this.itemForm.setValue({
      id: model.itemID,
      code: model.itemCode,
      name: model.itemName,
      desc: model.itemDescription,
      subID: model.subGroupID,
      subText: model.subGroupText,
      unitPrice: model.itemUnitPrice,
      unitPriceAD: model.itemUnitPriceWithMaxDiscount,
      availableQty: model.itemAvailableQty,
      reorderQty: model.itemReorderQtyReminder
    });    
    this.itemForm.updateValueAndValidity();
    
  }

  /*--------------------- --- List / Selector View Helper --- ----------------------*/
  tableDataSource: MatTableDataSource<ItemPreview>;
  textFilter: string = "";

  public sortTableData(sort: Sort, paginator: MatPaginator) {
    const data = this.tableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.itemID, b.itemID, isAsc);
        case 'Code': return this.compare(a.itemCode.toLowerCase(), b.itemCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.itemName.toLowerCase(), b.itemName.toLowerCase(), isAsc);
        case 'SID': return this.compare(a.subGroupID, b.subGroupID, isAsc);
        default: return 0;
      }
    });
    this.setupTableDataSource(sortedData, paginator);
  }

  public refreshListData(paginator: MatPaginator) {
    let obs = this.getAll().subscribe(modelResp => {
      this.setupTableDataSource(modelResp, paginator);
      obs.unsubscribe();
    })
  }

  public resetListFilter() {
    this.textFilter = "";
    this.applyListFilter();
  }

  public applyListFilter() { this.tableDataSource.filter = this.textFilter.trim().toLowerCase(); }

  private setupTableDataSource(data: ItemPreview[], paginator: MatPaginator) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }
}
