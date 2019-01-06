import { Component, OnInit, Inject } from '@angular/core';
import { CountryService } from 'src/app/services/location/country.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {

  currentMode: string = "";

  constructor(public service: CountryService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CountryComponent>) {
    this.currentMode = this.service.InitializeForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.COUNTRY_UPDATE_TITLE : Globals.COUNTRY_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  submit() {
    if (this.service.countryForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.service.update(this.service.getUpdateModelFromForm()).subscribe(updateResp => {
          this.dialogRef.close({ userSubmitted: true, newModel: updateResp });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.service.createNew(this.service.getCreateModelFromForm()).subscribe(createResp => {
          this.dialogRef.close({ userSubmitted: true, newModel: createResp });
          obs.unsubscribe();
        });
      }
    }
  }

  cancel() { this.dialogRef.close(); }

}
