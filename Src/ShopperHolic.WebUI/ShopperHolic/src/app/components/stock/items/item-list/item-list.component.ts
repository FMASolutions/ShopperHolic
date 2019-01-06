import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { ItemPreview } from 'src/app/models/stock/items/itemPreview';
import { Globals } from 'src/globals';
import { ItemService } from 'src/app/services/stock/item.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.ITEM_PRVW_LIST_COLUMNS;

  constructor(public service: ItemService, public childDialog: MatDialog) { }

  ngOnInit() {
    setTimeout(()=>{ 
      this.service.refreshListData(this.paginator);
    },1); 
  }

  public createClicked() {
    let dialogRef = this.childDialog.open(ItemComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted) { this.service.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.childDialog.open(ItemComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted) { this.service.refreshListData(this.paginator); }
      obs.unsubscribe(); 
    });
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.ITEM_DELETE_CONFIRM_MSG + id)) {
      let obs = this.service.delete(id).subscribe(() => { 
        this.service.refreshListData(this.paginator);
        obs.unsubscribe(); 
      });
    }
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }
}
