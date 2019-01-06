import { Component, OnInit, Inject } from '@angular/core';
import { AddressService } from 'src/app/services/location/address.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Globals } from 'src/globals';
import { CityAreaSelectorComponent } from '../../city-areas/city-area-selector/city-area-selector.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  currentMode: string = "";

  constructor(public service: AddressService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<AddressComponent>, public childDialog: MatDialog) {
    this.currentMode = this.service.InitializeForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.ADDRESS_UPDATE_TITLE : Globals.ADDRESS_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  openChildSelect(){
    let dialogRef = this.childDialog.open(CityAreaSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if(resp && resp.selectedModel) {
        this.service.updateSelectedCityArea(resp.selectedModel);
      }
    })
  }

  submit() {
    if (this.service.addressForm.valid) {
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
