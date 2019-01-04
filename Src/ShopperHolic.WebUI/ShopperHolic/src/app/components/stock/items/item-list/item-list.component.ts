import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { ItemPreview } from 'src/app/models/stock/items/itemPreview';
import { Globals } from 'src/globals';
import { ItemService } from 'src/app/services/stock/item/item.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  tableDataSource: MatTableDataSource<ItemPreview>;
  textFilter: string = "";
  displayedColumns: string[] = Globals.ITEM_PRVW_LIST_COLUMNS;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private itemService: ItemService, public itemDialog: MatDialog) { }

  ngOnInit() {
    setTimeout(()=>{ 
      this.refreshDatasource();
    },1); 
  }

  public createClicked() {
    let dialogRef = this.itemDialog.open(ItemComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted) { this.refreshDatasource(); }
      obs.unsubscribe();
    });
  }

  public editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.itemDialog.open(ItemComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted) { this.refreshDatasource(); }
      obs.unsubscribe(); 
    });
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.ITEM_DELETE_CONFIRM_MSG + id)) {
      let obs = this.itemService.delete(id).subscribe(() => { 
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
        case 'ID': return this.compare(a.itemID, b.itemID, isAsc);
        case 'Code': return this.compare(a.itemCode.toLowerCase(), b.itemCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.itemName.toLowerCase(), b.itemName.toLowerCase(), isAsc);
        case 'SID': return this.compare(a.subGroupID, b.subGroupID, isAsc);
        default: return 0;
      }
    });
    this.setupTableDataSource(sortedData);
  }

  private setupTableDataSource(data: ItemPreview[]) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }

  private refreshDatasource() {
    let obs = this.itemService.getAll().subscribe(itemResp => {
      this.setupTableDataSource(itemResp);
      obs.unsubscribe();
    })
  }

}
