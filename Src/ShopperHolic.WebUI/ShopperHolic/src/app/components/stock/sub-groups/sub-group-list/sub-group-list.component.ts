import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { SubGroupPreview } from 'src/app/models/stock/subGroups/subGroupPreview';
import { Globals } from 'src/globals';
import { SubGroupService } from 'src/app/services/stock/sub-group.service';
import { SubGroupComponent } from '../sub-group/sub-group.component';

@Component({
  selector: 'app-sub-group-list',
  templateUrl: './sub-group-list.component.html',
  styleUrls: ['./sub-group-list.component.css']
})
export class SubGroupListComponent implements OnInit {

  tableDataSource: MatTableDataSource<SubGroupPreview>;
  textFilter: string = "";
  displayedColumns: string[] = Globals.SUB_GROUP_PRVW_LIST_COLUMNS;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private subGroupService: SubGroupService, public subDialog: MatDialog) { }

  ngOnInit() {
    setTimeout(()=>{ 
      this.refreshDatasource();
    },1); 
  }

  public createClicked() {
    let dialogRef = this.subDialog.open(SubGroupComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted) { this.refreshDatasource(); }
      obs.unsubscribe();
    });
  }

  public editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.subDialog.open(SubGroupComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted) { this.refreshDatasource(); }
      obs.unsubscribe(); 
    });
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.SUB_GROUP_DELETE_CONFIRM_MSG + id)) {
      let obs = this.subGroupService.delete(id).subscribe(() => { 
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
        case 'ID': return this.compare(a.subGroupID, b.subGroupID, isAsc);
        case 'Code': return this.compare(a.subGroupCode.toLowerCase(), b.subGroupCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.subGroupName.toLowerCase(), b.subGroupName.toLowerCase(), isAsc);
        case 'PID': return this.compare(a.productGroupID, b.productGroupID, isAsc);
        default: return 0;
      }
    });
    this.setupTableDataSource(sortedData);
  }

  private setupTableDataSource(data: SubGroupPreview[]) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }

  private refreshDatasource() {
    let obs = this.subGroupService.getAll().subscribe(subGroupResp => {
      this.setupTableDataSource(subGroupResp);
      obs.unsubscribe();
    })
  }
}
