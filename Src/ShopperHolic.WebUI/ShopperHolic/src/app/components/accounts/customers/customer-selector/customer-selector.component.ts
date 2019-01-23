import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { CustomerService } from 'src/app/services/accounts/customer.service';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.css']
})
export class CustomerSelectorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.CUSTOMER_PRVW_SELECT_COLUMNS;

  constructor(public service: CustomerService, public childDialog: MatDialog, public ownDialog: MatDialogRef<CustomerSelectorComponent>) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.childDialog.open(CustomerComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted && resp.newModel) {
        this.ownDialog.close({ selectedModel: resp.newModel });
      }
      obs.unsubscribe();
    });
  }

  public selectClicked(id: number) {
    let obs = this.service.getByID(id).subscribe(modelResp => {
      obs.unsubscribe();
      this.ownDialog.close({ selectedModel: modelResp });
    })
  }

  public closeClicked() {
    this.ownDialog.close();
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }

}
