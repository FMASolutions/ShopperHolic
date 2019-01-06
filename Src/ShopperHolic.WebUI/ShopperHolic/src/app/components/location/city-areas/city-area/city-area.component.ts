import { Component, OnInit, Inject } from '@angular/core';
import { CityAreaService } from 'src/app/services/location/city-area.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Globals } from 'src/globals';
import { CitySelectorComponent } from '../../cities/city-selector/city-selector.component';

@Component({
  selector: 'app-city-area',
  templateUrl: './city-area.component.html',
  styleUrls: ['./city-area.component.css']
})
export class CityAreaComponent {

  currentMode: string = "";

  constructor(public service: CityAreaService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<CityAreaComponent>, public childDialog: MatDialog) {
    this.currentMode = this.service.InitializeForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.CITYAREA_UPDATE_TITLE : Globals.CITYAREA_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  openChildSelect(){
    let dialogRef = this.childDialog.open(CitySelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if(resp && resp.selectedModel) {
        this.service.updateSelectedCity(resp.selectedModel);
      }
    })
  }

  submit() {
    if (this.service.cityAreaForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.service.update(this.service.getUpdateModelFromForm()).subscribe(updateResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: updateResp  });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        console.log(this.service.getCreateModelFromForm())
        let obs = this.service.createNew(this.service.getCreateModelFromForm()).subscribe(createResp => {
          
          this.ownDialog.close({ userSubmitted: true, newModel: createResp });
          obs.unsubscribe();
        });
      }
    }
  }

  cancel() { this.ownDialog.close(); }

}
