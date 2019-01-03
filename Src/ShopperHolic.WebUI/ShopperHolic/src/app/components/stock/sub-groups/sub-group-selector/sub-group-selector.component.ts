import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, Sort } from '@angular/material';
import { SubGroupPreview } from 'src/app/models/stock/subGroups/subGroupPreview';
import { Globals } from 'src/globals';
import { SubGroupService } from 'src/app/services/stock/subGroup/sub-group.service';
import { SubGroupComponent } from '../sub-group/sub-group.component';

@Component({
  selector: 'app-sub-group-selector',
  templateUrl: './sub-group-selector.component.html',
  styleUrls: ['./sub-group-selector.component.css']
})
export class SubGroupSelectorComponent implements OnInit {

  tableDataSource: MatTableDataSource<SubGroupPreview>;
  textFilter: string = "";
  displayedColumns: string[] = Globals.SUB_GROUP_PRVW_SELECT_COLUMNS;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private subGroupService: SubGroupService, public subDialog: MatDialog, public dialogRef: MatDialogRef<SubGroupSelectorComponent>) { }

  ngOnInit() {
    setTimeout(()=>{ 
      this.refreshDatasource();
    },1); 
  }

  public createClicked() {
    let dialogRef = this.subDialog.open(SubGroupComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted && resp.createdSubGroup) { 
        this.dialogRef.close({ selectedSubGroup: resp.createdSubGroup}); 
      }
      obs.unsubscribe();
    });
  }

  public selectClicked(id: number) {
    let obs = this.subGroupService.getByID(id).subscribe(subGroupResp => {
      obs.unsubscribe();
      this.dialogRef.close({ selectedSubGroup: subGroupResp});
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
        case 'ID': return this.compare(a.subGroupID, b.subGroupID, isAsc);
        case 'Code': return this.compare(a.subGroupCode.toLowerCase(), b.subGroupCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.subGroupName.toLowerCase(), b.subGroupName.toLowerCase(), isAsc);
        case 'PID': return this.compare(a.productGroupID, b.productGroupID, isAsc);
        default: return 0;
      }
    });
    this.setupTableDataSource(sortedData);
  }

  public closeClicked(){
    this.dialogRef.close();
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
