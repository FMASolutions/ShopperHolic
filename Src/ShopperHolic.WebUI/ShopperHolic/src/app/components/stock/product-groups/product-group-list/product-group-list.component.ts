import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';
import { ProductGroupService } from 'src/app/services/stock/productGroup/product-group.service';
import { MatPaginator, MatSort, MatTableDataSource, Sort, MatDialog } from '@angular/material';
import { ProductGroupComponent } from '../product-group/product-group.component';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-product-group-list',
  templateUrl: './product-group-list.component.html',
  styleUrls: ['./product-group-list.component.css']
})
export class ProductGroupListComponent implements OnInit {

  tableDataSource: MatTableDataSource<ProductGroupPreview>;
  textFilter: string = "";
  displayedColumns: string[] = Globals.PROD_GROUP_PRVW_LIST_COLUMNS;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private prodGroupService: ProductGroupService, public prodDialog: MatDialog) { }

  ngOnInit() {
    setTimeout(()=>{ 
      this.refreshDatasource();
    },1); //Fake delay, error without using a timeout here, unsure why....
    
  }

  public createClicked() {
    let dialogRef = this.prodDialog.open(ProductGroupComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted) { this.refreshDatasource(); }
      obs.unsubscribe();
    });
  }

  public editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.prodDialog.open(ProductGroupComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted) { this.refreshDatasource(); }
      obs.unsubscribe(); 
    });
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.PROD_GROUP_DELETE_CONFIRM_MSG + id)) {
      let obs = this.prodGroupService.delete(id).subscribe(() => { 
        this.refreshDatasource();
        obs.unsubscribe(); 
      });
    }
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