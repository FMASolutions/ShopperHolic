import { Component, Inject } from '@angular/core';
import { ProductGroupService } from 'src/app/services/stock/productGroup/product-group.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent {

  currentMode: string = "";

  constructor(public prodService: ProductGroupService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProductGroupComponent>) {
    this.currentMode = this.prodService.InitializeForm(data);
  }

  getPageTitle() {
    if (this.currentMode == Globals.PROD_GROUP_UPDATE_MODE) { return Globals.PROD_GROUP_UPDATE_TITLE; }
    else if (this.currentMode == Globals.PROD_GROUP_CREATE_MODE) { return Globals.PROD_GROUP_CREATE_TITLE; }
  }

  getSubmitButtonText(){
    if (this.currentMode == Globals.PROD_GROUP_UPDATE_MODE) { return Globals.UPDATE_BUTTON_TEXT }
    else if (this.currentMode == Globals.PROD_GROUP_CREATE_MODE) { return Globals.CREATE_BUTTON_TEXT }
  }

  submit() {
    if (this.prodService.prodForm.valid) {
      if (this.currentMode == Globals.PROD_GROUP_UPDATE_MODE) {
        let obs = this.prodService.update(this.prodService.getUpdateModelFromForm()).subscribe(() => {
          this.dialogRef.close({ userSubmitted: true });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.PROD_GROUP_CREATE_MODE) {
        let obs = this.prodService.createNewProduct(this.prodService.getCreateModelFromForm()).subscribe(() => {
          this.dialogRef.close({ userSubmitted: true });
          obs.unsubscribe();
        });
      }
    }
  }

  cancel() { this.dialogRef.close(); }
}
