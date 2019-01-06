import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { SubGroupService } from 'src/app/services/stock/sub-group.service';
import { SubGroupComponent } from '../sub-group/sub-group.component';

@Component({
  selector: 'app-sub-group-selector',
  templateUrl: './sub-group-selector.component.html',
  styleUrls: ['./sub-group-selector.component.css']
})
export class SubGroupSelectorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.SUB_GROUP_PRVW_SELECT_COLUMNS;

  constructor(public service: SubGroupService, public subDialog: MatDialog, public dialogRef: MatDialogRef<SubGroupSelectorComponent>) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.subDialog.open(SubGroupComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted && resp.newModel) { 
        this.dialogRef.close({ selectedModel: resp.newModel}); 
      }
      obs.unsubscribe();
    });
  }

  public selectClicked(id: number) {
    let obs = this.service.getByID(id).subscribe(modelResp => {
      obs.unsubscribe();
      this.dialogRef.close({ selectedModel: modelResp});
    })
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }

  public closeClicked() { this.dialogRef.close(); }

}
