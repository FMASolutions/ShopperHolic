import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/stock/item.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Globals } from 'src/globals';
import { SubGroupSelectorComponent } from '../../sub-groups/sub-group-selector/sub-group-selector.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @ViewChild('fileSelector') fileSelector;
  @ViewChild('currentImage') currentImageElement;
  currentMode: string = "";
  currentSelectedFile: File = null;
  

  constructor(public service: ItemService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<ItemComponent>, public childDialog: MatDialog) {
    this.service.initializeForm();
  }

  ngOnInit() {
    setTimeout(() => {
      this.currentMode = this.service.determinModeAndPopulateForm(this.currentImageElement, this.data);  
    }, 1);
    
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.ITEM_UPDATE_TITLE : Globals.ITEM_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  openChildSelect() {
    let dialogRef = this.childDialog.open(SubGroupSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if (resp && resp.selectedModel) {
        this.service.updateSelectedSubGroup(resp.selectedModel);
      }
    })
  }

  uploadClicked() {
    this.fileSelector.nativeElement.click();
  }

  fileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.service.newFileSelected(event.target.files[0], this.currentImageElement);
      this.currentSelectedFile = event.target.files[0];
    }
  }

  submit() {
    if (this.service.itemForm.valid) {

      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.service.update(this.service.getUpdateModelFromForm()).subscribe(updateResp => {
          obs.unsubscribe();
          if (this.currentSelectedFile) { //Only perform upload if a new file has been selected.
            let obsUpload = this.service.imageUpload(this.currentSelectedFile, updateResp.itemID).subscribe(resp => {
              obsUpload.unsubscribe();
              this.ownDialog.close({ userSubmitted: true, newModel: updateResp });
            });
          }
          else { this.ownDialog.close({ userSubmitted: true, newModel: updateResp }); }
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        if (this.currentSelectedFile) { //Only create file if we have selected a file to upload....
          let obs = this.service.createNew(this.service.getCreateModelFromForm()).subscribe((createResp) => {
            obs.unsubscribe();
            let obsUpload = this.service.imageUpload(this.currentSelectedFile, createResp.itemID).subscribe(resp => {
              obsUpload.unsubscribe();
              this.ownDialog.close({ userSubmitted: true, newModel: createResp });
            });
          });
        }
      }
    }
  }

  cancel() { this.ownDialog.close(); }
}
