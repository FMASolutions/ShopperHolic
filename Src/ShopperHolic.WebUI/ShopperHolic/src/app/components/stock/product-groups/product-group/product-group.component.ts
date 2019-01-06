import { Component, Inject } from '@angular/core';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
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

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.PROD_GROUP_UPDATE_TITLE : Globals.PROD_GROUP_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  submit() {
    if (this.prodService.prodForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.prodService.update(this.prodService.getUpdateModelFromForm()).subscribe(() => {
          this.dialogRef.close({ userSubmitted: true });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.prodService.createNew(this.prodService.getCreateModelFromForm()).subscribe(createResp => {
          this.dialogRef.close({ userSubmitted: true, createdProductGroup: createResp });
          obs.unsubscribe();
        });
      }
    }
  }

  cancel() { this.dialogRef.close(); }
}
