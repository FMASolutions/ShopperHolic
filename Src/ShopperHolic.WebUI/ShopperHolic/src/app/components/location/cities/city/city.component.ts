import { Component, OnInit, Inject } from '@angular/core';
import { CityService } from 'src/app/services/location/city.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Globals } from 'src/globals';
import { CountrySelectorComponent } from '../../countries/country-selector/country-selector.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {

  currentMode: string = "";

  constructor(public service: CityService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<CityComponent>, public childDialog: MatDialog) {
    this.currentMode = this.service.InitializeForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.CITY_UPDATE_TITLE : Globals.CITY_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  openChildSelect(){
    let dialogRef = this.childDialog.open(CountrySelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if(resp && resp.selectedModel) {
        this.service.updateSelectedCountry(resp.selectedModel);
      }
    })
  }

  submit() {
    if (this.service.cityForm.valid) {
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
