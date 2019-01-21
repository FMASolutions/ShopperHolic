import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { CustomerService } from 'src/app/services/accounts/customer.service';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.CUSTOMER_PRVW_LIST_COLUMNS;

  constructor(public service: CustomerService, public childDialog: MatDialog) { }

  ngOnInit() { 
    
    
    setTimeout(() => { this.service.refreshListData(this.paginator); }, 1);
   }

  public createClicked() {
    let dialogRef = this.childDialog.open(CustomerComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.childDialog.open(CustomerComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.CUSTOMER_DELETE_CONFIRM_MSG + id)) {
      let obs = this.service.delete(id).subscribe(() => {
        this.service.refreshListData(this.paginator);
        obs.unsubscribe();
      });
    }
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }

}
