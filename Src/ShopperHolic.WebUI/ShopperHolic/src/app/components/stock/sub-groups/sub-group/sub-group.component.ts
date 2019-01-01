import { Component, OnInit, Inject } from '@angular/core';
import { SubGroupService } from 'src/app/services/stock/subGroup/sub-group.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-sub-group',
  templateUrl: './sub-group.component.html',
  styleUrls: ['./sub-group.component.css']
})
export class SubGroupComponent {

  currentMode: string = "";

  constructor(public subGroupService: SubGroupService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SubGroupComponent>) {
    this.currentMode = this.subGroupService.InitializeForm(data);
  }

  getPageTitle() {
    if (this.currentMode == Globals.MODE_UPDATE) { return Globals.SUB_GROUP_UPDATE_TITLE; }
    else if (this.currentMode == Globals.MODE_CREATE) { return Globals.SUB_GROUP_CREATE_TITLE; }
  }

  getSubmitButtonText(){
    if (this.currentMode == Globals.MODE_UPDATE) { return Globals.UPDATE_BUTTON_TEXT }
    else if (this.currentMode == Globals.MODE_CREATE) { return Globals.CREATE_BUTTON_TEXT }
  }

  submit() {
    if (this.subGroupService.subForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.subGroupService.update(this.subGroupService.getUpdateModelFromForm()).subscribe(() => {
          this.dialogRef.close({ userSubmitted: true });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.subGroupService.createNewSubGroup(this.subGroupService.getCreateModelFromForm()).subscribe(() => {
          this.dialogRef.close({ userSubmitted: true });
          obs.unsubscribe();
        });
      }
    }
  }

  cancel() { this.dialogRef.close(); }

}
