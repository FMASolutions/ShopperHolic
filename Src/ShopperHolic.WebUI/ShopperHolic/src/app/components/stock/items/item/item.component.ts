import { Component, Inject, ViewChild } from '@angular/core';
import { ItemService } from 'src/app/services/stock/item/item.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Globals } from 'src/globals';
import { SubGroupSelectorComponent } from '../../sub-groups/sub-group-selector/sub-group-selector.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @ViewChild('fileSelector') fileSelector;
  @ViewChild('currentImage') currentImage;
  currentMode: string = "";
  currentSelectedFile: File = null;
  imageSrc: string = "";

  constructor(public itemService: ItemService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<ItemComponent>, public subDialog: MatDialog) {
    this.currentMode = this.itemService.InitializeForm(data);
  }

  getPageTitle() {
    if (this.currentMode == Globals.MODE_UPDATE) { return Globals.ITEM_UPDATE_TITLE; }
    else if (this.currentMode == Globals.MODE_CREATE) { return Globals.ITEM_CREATE_TITLE; }
  }

  getSubmitButtonText(){
    if (this.currentMode == Globals.MODE_UPDATE) { return Globals.UPDATE_BUTTON_TEXT }
    else if (this.currentMode == Globals.MODE_CREATE) { return Globals.CREATE_BUTTON_TEXT }
  }

  openProdSelectDialog(){
    let dialogRef = this.subDialog.open(SubGroupSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if(resp && resp.selectedSubGroup) {
        this.itemService.updateSelectedSubGroup(resp.selectedSubGroup);
      }
    })
  }

  uploadClicked(){
    this.fileSelector.nativeElement.click();
  }

  fileSelected(event){
    if(event.target.files && event.target.files[0]){
      this.currentSelectedFile = event.target.files[0];
      this.itemService.itemForm.controls["itemImageFilename"].setValue(this.currentSelectedFile.name);
      const reader = new FileReader();
      reader.onload = () => {
         this.imageSrc = reader.result.toString();
         this.currentImage.nativeElement.src = this.imageSrc;
      }
      reader.readAsDataURL(this.currentSelectedFile);
    }
  }

  submit() {
    if (this.itemService.itemForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.itemService.update(this.itemService.getUpdateModelFromForm()).subscribe((updateResp) => {
          obs.unsubscribe();
          let obsUpload = this.itemService.imageUpload(this.currentSelectedFile, updateResp.itemID).subscribe(resp =>{
            obsUpload.unsubscribe();
            this.ownDialog.close({ userSubmitted: true });            
          });
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.itemService.createNew(this.itemService.getCreateModelFromForm()).subscribe((createResp) => {
          obs.unsubscribe();
          let obsUpload = this.itemService.imageUpload(this.currentSelectedFile, createResp.itemID).subscribe(resp =>{
            obsUpload.unsubscribe();
            this.ownDialog.close({ userSubmitted: true, createdItem: createResp });
          });
        });
      }
    }
  }

  cancel() { this.ownDialog.close(); }
}
