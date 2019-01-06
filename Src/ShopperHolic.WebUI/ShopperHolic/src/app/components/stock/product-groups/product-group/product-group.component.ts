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

  constructor(public service: ProductGroupService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<ProductGroupComponent>) {
    this.currentMode = this.service.InitializeForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.PROD_GROUP_UPDATE_TITLE : Globals.PROD_GROUP_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  submit() {
    if (this.service.prodForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.service.update(this.service.getUpdateModelFromForm()).subscribe(updateResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: updateResp  });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.service.createNew(this.service.getCreateModelFromForm()).subscribe(createResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: createResp });
          obs.unsubscribe();
        });
      }
    }
  }

  cancel() { this.ownDialog.close(); }
}
