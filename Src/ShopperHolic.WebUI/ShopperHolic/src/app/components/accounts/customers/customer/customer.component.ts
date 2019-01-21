import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { CustomerService } from 'src/app/services/accounts/customer.service';
import { Globals } from 'src/globals';
import { AddressSelectorComponent } from 'src/app/components/location/addresses/address-selector/address-selector.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  currentMode: string = "";

  constructor(public service: CustomerService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<CustomerComponent>, public childDialog: MatDialog) {
    this.currentMode = this.service.InitializeForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.CUSTOMER_UPDATE_TITLE : Globals.CUSTOMER_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  openChildSelect(){
    let dialogRef = this.childDialog.open(AddressSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if(resp && resp.selectedModel) {
        this.service.updateSelectedDefaultAddress(resp.selectedModel);
      }
    })
  }

  submit() {
    if (this.service.customerForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.service.update(this.service.getUpdateModelFromForm()).subscribe(updateResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: updateResp });
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
