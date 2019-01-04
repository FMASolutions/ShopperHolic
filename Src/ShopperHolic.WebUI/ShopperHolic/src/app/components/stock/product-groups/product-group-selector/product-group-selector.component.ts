import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, Sort, MatDialogRef } from '@angular/material';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';
import { Globals } from 'src/globals';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { ProductGroupComponent } from '../product-group/product-group.component';

@Component({
  selector: 'app-product-group-selector',
  templateUrl: './product-group-selector.component.html',
  styleUrls: ['./product-group-selector.component.css']
})
export class ProductGroupSelectorComponent implements OnInit {

  tableDataSource: MatTableDataSource<ProductGroupPreview>;
  textFilter: string = "";
  displayedColumns: string[] = Globals.PROD_GROUP_PRVW_SELECT_COLUMNS;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private prodGroupService: ProductGroupService, public prodDialog: MatDialog, public dialogRef: MatDialogRef<ProductGroupSelectorComponent>) { }

  ngOnInit() {
    setTimeout(()=>{ 
      this.refreshDatasource();
    },1); 
  }

  public createClicked() {
    let dialogRef = this.prodDialog.open(ProductGroupComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted && resp.createdProductGroup) { 
        this.dialogRef.close({ selectedProductGroup: resp.createdProductGroup}); 
      }
      obs.unsubscribe();
    });
  }

  public selectClicked(id: number) {
    let obs = this.prodGroupService.getByID(id).subscribe(prodGroupResp => {
      obs.unsubscribe();
      this.dialogRef.close({ selectedProductGroup: prodGroupResp});
    })
  }

  public resetFilterClicked() {
    this.textFilter = "";
    this.applyFilterClicked();
  }

  public applyFilterClicked() { this.tableDataSource.filter = this.textFilter.trim().toLowerCase(); }

  public sortClicked(sort: Sort) {
    const data = this.tableDataSource.filteredData.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.productGroupID, b.productGroupID, isAsc);
        case 'Code': return this.compare(a.productGroupCode.toLowerCase(), b.productGroupCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.productGroupName.toLowerCase(), b.productGroupName.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.setupTableDataSource(sortedData);
  }

  public closeClicked(){
    this.dialogRef.close();
  }

  private setupTableDataSource(data: ProductGroupPreview[]) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }

  private refreshDatasource() {
    let obs = this.prodGroupService.getAll().subscribe(prodGroupsResp => {
      this.setupTableDataSource(prodGroupsResp);
      obs.unsubscribe();
    })
  }
}
