import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { MatPaginator, MatSort, Sort, MatDialog } from '@angular/material';
import { ProductGroupComponent } from '../product-group/product-group.component';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-product-group-list',
  templateUrl: './product-group-list.component.html',
  styleUrls: ['./product-group-list.component.css']
})
export class ProductGroupListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.PROD_GROUP_PRVW_LIST_COLUMNS;

  constructor(public service: ProductGroupService, public childDialog: MatDialog) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.childDialog.open(ProductGroupComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.childDialog.open(ProductGroupComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.PROD_GROUP_DELETE_CONFIRM_MSG + id)) {
      let obs = this.service.delete(id).subscribe(() => {
        this.service.refreshListData(this.paginator);
        obs.unsubscribe();
      });
    }
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }
}