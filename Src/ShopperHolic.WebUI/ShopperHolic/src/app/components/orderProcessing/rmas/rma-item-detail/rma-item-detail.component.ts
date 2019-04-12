import { Component, OnInit, Inject } from '@angular/core';
import { RmaService } from 'src/app/services/orderProcessing/rma.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Globals } from 'src/globals';
import { OrderItemSelecorComponent } from '../../orders/order-item-selecor/order-item-selecor.component';

@Component({
  selector: 'app-rma-item-detail',
  templateUrl: './rma-item-detail.component.html',
  styleUrls: ['./rma-item-detail.component.css']
})
export class RmaItemDetailComponent {

  currentMode: string = "";
  

  constructor(public service: RmaService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<RmaItemDetailComponent>, public childDialog: MatDialog) {
    if(data && data.rmaItemID)
      this.currentMode = this.service.initializeItemForm(data.rmaItemID);
    else
      this.currentMode = this.service.initializeItemForm();
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.RMA_ITEM_UPDATE_TITLE : Globals.RMA_ITEM_ADD_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.ADD_BUTTON_TEXT; }

  openChildSelect(){
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = this.data.orderID;
    let dialogRef = this.childDialog.open(OrderItemSelecorComponent, modalSettings);
    dialogRef.afterClosed().subscribe(resp => {
      if(resp && resp.selectedModel) {
        this.service.updateSelectedItem(resp.selectedModel);
      }
    })
  }

  submit() {
    if (this.service.itemForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.service.updateRMAItem(this.service.getUpdateItemModelFromForm()).subscribe(updateResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: updateResp });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.service.addItemToRMA(this.service.getCreateItemModelFromForm()).subscribe(createResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: createResp });
          obs.unsubscribe();
        });
      }
    }
  }

  cancel() { this.ownDialog.close(); }

}
