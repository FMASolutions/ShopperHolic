import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/stock/item/item.service';
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

  constructor(public itemService: ItemService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<ItemComponent>, public subDialog: MatDialog) { }

  ngOnInit() {
    this.currentMode = this.itemService.InitializeForm(this.currentImageElement, this.data);
  }

  getPageTitle() {
    if (this.currentMode == Globals.MODE_UPDATE) { return Globals.ITEM_UPDATE_TITLE; }
    else if (this.currentMode == Globals.MODE_CREATE) { return Globals.ITEM_CREATE_TITLE; }
  }

  getSubmitButtonText() {
    if (this.currentMode == Globals.MODE_UPDATE) { return Globals.UPDATE_BUTTON_TEXT }
    else if (this.currentMode == Globals.MODE_CREATE) { return Globals.CREATE_BUTTON_TEXT }
  }

  openSubSelect() {
    let dialogRef = this.subDialog.open(SubGroupSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if (resp && resp.selectedSubGroup) {
        this.itemService.updateSelectedSubGroup(resp.selectedSubGroup);
      }
    })
  }

  uploadClicked() {
    this.fileSelector.nativeElement.click();
  }

  fileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.itemService.newFileSelected(event.target.files[0], this.currentImageElement);
      this.currentSelectedFile = event.target.files[0];
    }
  }

  submit() {
    if (this.itemService.itemForm.valid) {

      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.itemService.update(this.itemService.getUpdateModelFromForm()).subscribe((updateResp) => {
          obs.unsubscribe();
          if (this.currentSelectedFile) { //Only perform upload if a new file has been selected.
            console.log("uploading file");
            let obsUpload = this.itemService.imageUpload(this.currentSelectedFile, updateResp.itemID).subscribe(resp => {
              obsUpload.unsubscribe();
              this.ownDialog.close({ userSubmitted: true });
            });
          }
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        if(this.currentSelectedFile) { //Only create file if we have selected a file to upload.... TODO Update this part so we can't submit form without selecting a image.
          let obs = this.itemService.createNew(this.itemService.getCreateModelFromForm()).subscribe((createResp) => {
            obs.unsubscribe();
            let obsUpload = this.itemService.imageUpload(this.currentSelectedFile, createResp.itemID).subscribe(resp => {
              obsUpload.unsubscribe();
              this.ownDialog.close({ userSubmitted: true, createdItem: createResp });
            });
          });
        }
      }
    }
  }

  cancel() { this.ownDialog.close(); }
}
