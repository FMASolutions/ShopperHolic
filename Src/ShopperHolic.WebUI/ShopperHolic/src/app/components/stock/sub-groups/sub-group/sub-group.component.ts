import { Component, OnInit, Inject } from '@angular/core';
import { SubGroupService } from 'src/app/services/stock/sub-group.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Globals } from 'src/globals';
import { ProductGroupSelectorComponent } from '../../product-groups/product-group-selector/product-group-selector.component';

@Component({
  selector: 'app-sub-group',
  templateUrl: './sub-group.component.html',
  styleUrls: ['./sub-group.component.css']
})
export class SubGroupComponent {

  currentMode: string = "";

  constructor(public subGroupService: SubGroupService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<SubGroupComponent>, public prodDialog: MatDialog) {
    this.currentMode = this.subGroupService.InitializeForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.SUB_GROUP_UPDATE_TITLE : Globals.SUB_GROUP_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  openProdSelectDialog(){
    let dialogRef = this.prodDialog.open(ProductGroupSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if(resp && resp.selectedProductGroup) {
        this.subGroupService.updateSelectedProductGroup(resp.selectedProductGroup);
      }
    })
  }

  submit() {
    if (this.subGroupService.subForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.subGroupService.update(this.subGroupService.getUpdateModelFromForm()).subscribe(() => {
          this.ownDialog.close({ userSubmitted: true });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.subGroupService.createNew(this.subGroupService.getCreateModelFromForm()).subscribe((createResp) => {
          this.ownDialog.close({ userSubmitted: true, createdSubGroup: createResp });
          obs.unsubscribe();
        });
      }
    }
  }

  cancel() { this.ownDialog.close(); }

}
