import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { SubGroupService } from 'src/app/services/stock/sub-group.service';
import { SubGroupComponent } from '../sub-group/sub-group.component';

@Component({
  selector: 'app-sub-group-list',
  templateUrl: './sub-group-list.component.html',
  styleUrls: ['./sub-group-list.component.css']
})
export class SubGroupListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.SUB_GROUP_PRVW_LIST_COLUMNS;

  constructor(public service: SubGroupService, public childDialog: MatDialog) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.childDialog.open(SubGroupComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.childDialog.open(SubGroupComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.SUB_GROUP_DELETE_CONFIRM_MSG + id)) {
      let obs = this.service.delete(id).subscribe(() => {
        this.service.refreshListData(this.paginator);
        obs.unsubscribe();
      });
    }
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }
}
