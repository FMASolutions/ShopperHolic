import { Component, OnInit, Inject } from '@angular/core';
import { RmaService } from 'src/app/services/orderProcessing/rma.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';
import { Globals } from 'src/globals';
import { OrderSelectorComponent } from '../../orders/order-selector/order-selector.component';

@Component({
  selector: 'app-rma-detail',
  templateUrl: './rma-detail.component.html',
  styleUrls: ['./rma-detail.component.css']
})
export class RmaDetailComponent {

  currentMode: string  = "";

  constructor(public service: RmaService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<RmaDetailComponent>,
     public childDialog: MatDialog, private navService: AppNavigationService ) {
    this.currentMode = service.initializeHeaderForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.RMA_UPDATE_TITLE : Globals.RMA_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  public openOrderSelector() {
    let dialogRef = this.childDialog.open(OrderSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if (resp && resp.selectedModel) {
        this.service.updateSelectedOrder(resp.selectedModel);
      }
    })
  }

  public submit() {
    if (this.service.rmaHeaderForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        /*TODO Implement Update RMA Header
        let obs = this.service.up(this.service.getUpdateModelFromForm()).subscribe(updateResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: updateResp  });
          obs.unsubscribe();
        });
        */

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.service.createNew(this.service.getCreateModelFromForm()).subscribe(createResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: createResp });
          this.navService.goToRMAPage(createResp.header.rmaid);
          obs.unsubscribe();
        });
      }
    }
  }

  public cancel() { this.ownDialog.close(); }

}
