import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from 'src/globals';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { ProductGroupComponent } from '../product-group/product-group.component';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, Sort } from '@angular/material';

@Component({
  selector: 'app-product-group-selector',
  templateUrl: './product-group-selector.component.html',
  styleUrls: ['./product-group-selector.component.css']
})
export class ProductGroupSelectorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.PROD_GROUP_PRVW_SELECT_COLUMNS;

  constructor(public service: ProductGroupService, public childDialog: MatDialog, public ownDialog: MatDialogRef<ProductGroupSelectorComponent>) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.childDialog.open(ProductGroupComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
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

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }

  public closeClicked() { this.ownDialog.close(); }
}
