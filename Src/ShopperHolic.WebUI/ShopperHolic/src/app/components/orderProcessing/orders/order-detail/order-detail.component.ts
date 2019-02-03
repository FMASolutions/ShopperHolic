import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from 'src/app/services/orderProcessing/order.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { CustomerSelectorComponent } from 'src/app/components/accounts/customers/customer-selector/customer-selector.component';
import { Globals } from 'src/globals';
import { AddressSelectorComponent } from 'src/app/components/location/addresses/address-selector/address-selector.component';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {

  currentMode: string  = "";

  constructor(public service: OrderService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<OrderDetailComponent>,
     public childDialog: MatDialog, private navService: AppNavigationService ) {
    this.currentMode = service.initializeHeaderForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.ORDER_UPDATE_TITLE : Globals.ORDER_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  public openCustomerSelector() {
    let dialogRef = this.childDialog.open(CustomerSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if (resp && resp.selectedModel) {
        this.service.updateSelectedCustomer(resp.selectedModel);
      }
    })
  }

  public openAddressSelector() {
    let dialogRef = this.childDialog.open(AddressSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if (resp && resp.selectedModel) {
        this.service.updateSelectedAddress(resp.selectedModel);
      }
    })
  }

  public submit() {
    if (this.service.orderHeaderForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.service.update(this.service.getUpdateModelFromForm()).subscribe(updateResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: updateResp  });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.service.createNew(this.service.getCreateModelFromForm()).subscribe(createResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: createResp });
          this.navService.goToOrderPage(createResp.header.orderID);
          obs.unsubscribe();
        });
      }
    }
  }

  public cancel() { this.ownDialog.close(); }

}
