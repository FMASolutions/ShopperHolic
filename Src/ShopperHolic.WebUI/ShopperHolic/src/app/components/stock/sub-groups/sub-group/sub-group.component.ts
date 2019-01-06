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

  constructor(public service: SubGroupService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<SubGroupComponent>, public childDialog: MatDialog) {
    this.currentMode = this.service.InitializeForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.SUB_GROUP_UPDATE_TITLE : Globals.SUB_GROUP_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  openChildSelect(){
    let dialogRef = this.childDialog.open(ProductGroupSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if(resp && resp.selectedModel) {
        this.service.updateSelectedProductGroup(resp.selectedModel);
      }
    })
  }

  submit() {
    if (this.service.subForm.valid) {
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
