import { Injectable } from '@angular/core';
import { Globals } from 'src/globals';
import { HttpClient } from '@angular/common/http';
import { UserNotificationService } from '../../generic/user-notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemValidator } from './item-validator';
import { CreateItem } from 'src/app/models/stock/items/createItem';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/stock/items/item';
import { tap } from 'rxjs/operators';
import { ItemPreview } from 'src/app/models/stock/items/itemPreview';
import { SubGroup } from 'src/app/models/stock/subGroups/subGroup';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseURL: string = Globals.APP_SETTINGS.BASE_API_URL + '/Item/';
  imageLocationPrefix: string = "http://localhost:5000/uploads/";
  imageSrc: string = "";
  
  constructor(private http: HttpClient, private userNotificationService: UserNotificationService, private fb: FormBuilder, private validator: ItemValidator,) { }

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
    this.userNotificationService.informUserStart("", Globals.SPINNER_GET_MESSAGE);
    return this.http.get<Item>(this.baseURL + 'GetByID/?id=' + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete("");
    }, err => {
      this.userNotificationService.informUserError(Globals.ITEM_READ_FAILED_MSG + id);  
      this.userNotificationService.informUserError(err.error);
    }));;
  }

  public getAll(): Observable<ItemPreview[]> {
    this.userNotificationService.informUserStart(Globals.ITEM_READ_ATTEMPT_MSG,Globals.SPINNER_GET_MESSAGE);
    return this.http.get<ItemPreview[]>(this.baseURL + 'GetAll').pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ITEM_READ_SUCCESS_MSG);
    }, err => {
      this.userNotificationService.informUserError(Globals.ITEM_READ_FAILED_MSG);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public update(newModel: Item): Observable<Item> {
    this.userNotificationService.informUserStart(Globals.ITEM_UPDATE_ATTEMPT_MSG + newModel.itemCode,Globals.SPINNER_UPDATE_MESSAGE);
    return this.http.put<Item>(this.baseURL + 'Update', newModel).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ITEM_UPDATE_SUCCESS_MSG + resp.itemCode);
    }, err => {
      this.userNotificationService.informUserError(Globals.ITEM_UPDATE_FAILED_MSG + newModel.itemCode);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public delete(id: number): Observable<boolean> {
    this.userNotificationService.informUserStart(Globals.ITEM_DELETE_ATTEMPT_MSG + id,Globals.SPINNER_DELETE_MESSAGE);
    return this.http.delete<boolean>(this.baseURL + "Delete?id=" + id.toString()).pipe(tap(resp => {
      this.userNotificationService.informUserComplete(Globals.ITEM_DELETE_SUCCESS_MSG + id);
    }, err => {
      this.userNotificationService.informUserError(Globals.ITEM_DELETE_FAILED_MSG + id);
      this.userNotificationService.informUserError(err.error);
    }));
  }

  public imageUpload(uploadFile: File, id: number): Observable<string>{
    this.userNotificationService.informUserStart("Performing image upload", Globals.SPINNER_CREATE_MESSAGE);
    const formData = new FormData();
    formData.append(uploadFile.name, uploadFile);
    formData.append("id", id.toString());
    return this.http.post<string>(this.baseURL + 'UploadImage', formData).pipe(tap(() =>{
      this.userNotificationService.informUserComplete("Upload Complete");
    }))
  }

  /*--------------------- --- Item Popup Helper --- ----------------------*/
  public itemForm: FormGroup;

  public InitializeForm(currentImageElement: any, id?: any) : string{
    this.itemForm = this.fb.group({
      id: [0, []],
      code: [null, [this.validator.validateCodeForCreate]],
      name: [null, [this.validator.basicValidation]],
      desc: [null, [this.validator.basicValidation]],
      subID: [null, [this.validator.validateSubGroupID]],
      subText: [null, [this.validator.basicValidation]],
      unitPrice: [null, [this.validator.basicValidation]],
      unitPriceAD: [null, [this.validator.basicValidation]],
      availableQty: [null, [this.validator.basicValidation]],
      reorderQty: [null, [this.validator.basicValidation]],
    });

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

    //TODO LOAD IMAGE FILE

    return currentMode;
  }

  public newFileSelected(newFile: File, currentImageElement: any){
    
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

  public updateSelectedSubGroup(selectedGroup: SubGroup){
    this.itemForm.controls["subID"].setValue(selectedGroup.subGroupID);
    this.itemForm.controls["subText"].setValue(selectedGroup.subGroupID + " - " + selectedGroup.subGroupCode + " - " + selectedGroup.subGroupName);
  }

  public getCreateModelFromForm(): CreateItem{
    let newModel: CreateItem = {
      subGroupID: this.itemForm.value["subID"],
      itemCode: this.itemForm.value["code"],
      itemName: this.itemForm.value["name"],
      itemDescription: this.itemForm.value["desc"],
      itemUnitPrice: this.itemForm.value["unitPrice"],
      itemUnitPriceWithMaxDiscount: this.itemForm.value["unitPriceAD"],
      itemReorderQtyReminder: this.itemForm.value["reorderQty"],
      itemAvailableQty: this.itemForm.value["availableQty"],
    };
    return newModel;
  }

  private determinMode(id?: any) : string {
    let returnString = "";
    if (id) { returnString = Globals.MODE_UPDATE; }
    else { returnString = Globals.MODE_CREATE; }
    return returnString;
  }

  private populateFormFromModel(model: Item) {
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
  }
}
