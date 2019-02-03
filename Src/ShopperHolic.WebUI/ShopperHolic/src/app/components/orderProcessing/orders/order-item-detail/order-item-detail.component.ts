import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from 'src/app/services/orderProcessing/order.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Globals } from 'src/globals';
import { ItemSelectorComponent } from 'src/app/components/stock/items/item-selector/item-selector.component';

@Component({
  selector: 'app-order-item-detail',
  templateUrl: './order-item-detail.component.html',
  styleUrls: ['./order-item-detail.component.css']
})
export class OrderItemDetailComponent {

  currentMode: string = "";

  constructor(public service: OrderService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<OrderItemDetailComponent>, public childDialog: MatDialog) {
    this.currentMode = this.service.initializeItemForm(data);
  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.ORDER_ITEM_UPDATE_TITLE : Globals.ORDER_ITEM_ADD_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.ADD_BUTTON_TEXT; }

  openChildSelect(){
    let dialogRef = this.childDialog.open(ItemSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if(resp && resp.selectedModel) {
        this.service.updateSelectedItem(resp.selectedModel);
      }
    })
  }

  submit() {
    if (this.service.itemForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.service.updateOrderItem(this.service.getUpdateItemModelFromForm()).subscribe(updateResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: updateResp });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.service.addItemToOrder(this.service.getCreateItemModelFromForm()).subscribe(createResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: createResp });
          obs.unsubscribe();
        });
      }
    }
  }

  cancel() { this.ownDialog.close(); }

}
