import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { MatPaginator, MatSort, MatTableDataSource, Sort, MatDialog } from '@angular/material';
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

  constructor(public prodGroupService: ProductGroupService, public prodDialog: MatDialog) { }

  ngOnInit() { setTimeout(() => { this.prodGroupService.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.prodDialog.open(ProductGroupComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.prodGroupService.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.prodDialog.open(ProductGroupComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.prodGroupService.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.PROD_GROUP_DELETE_CONFIRM_MSG + id)) {
      let obs = this.prodGroupService.delete(id).subscribe(() => {
        this.prodGroupService.refreshListData(this.paginator);
        obs.unsubscribe();
      });
    }
  }

  public resetFilterClicked() { this.prodGroupService.resetListFilter() }

  public applyFilterClicked() { this.prodGroupService.applyListFilter() }

  public sortClicked(sort: Sort) { this.prodGroupService.sortTableData(sort, this.paginator); }
}