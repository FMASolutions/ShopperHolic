import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { OrderService } from 'src/app/services/orderProcessing/order.service';

@Component({
  selector: 'app-order-item-selecor',
  templateUrl: './order-item-selecor.component.html',
  styleUrls: ['./order-item-selecor.component.css']
})
export class OrderItemSelecorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.ORDER_ITEM_SELECT_COUMNS;

  constructor(public service: OrderService, public childDialog: MatDialog, public ownDialog: MatDialogRef<OrderItemSelecorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { 
    setTimeout(() => { 
      let obs = this.service.getItemsForOrder(this.data).subscribe(resp =>{
        this.service.refreshItemListData(this.paginator, resp);
      })
    }, 1); 
  }

  public selectClicked(id: number) {
    let obs = this.service.getOrderItemByID(id).subscribe(modelResp => {
      obs.unsubscribe();
      this.ownDialog.close({ selectedModel: modelResp});
    })
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }

  public closeClicked() { this.ownDialog.close(); }

}
