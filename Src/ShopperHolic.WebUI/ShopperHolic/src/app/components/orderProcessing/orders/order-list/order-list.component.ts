import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/orderProcessing/order.service';
import { MatDialog, MatSort, MatPaginator, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.ORDER_PRVW_LIST_COLUMNS;

  constructor(public service: OrderService, public childDialog: MatDialog, private navService: AppNavigationService) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public editClicked(id: number) {
    this.navService.goToOrderPage(id);
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.ORDER_DELETE_CONFIRM_MSG + id)) {
      let obs = this.service.delete(id).subscribe(() => {
        this.service.refreshListData(this.paginator);
        obs.unsubscribe();
      });
    }
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }

}
