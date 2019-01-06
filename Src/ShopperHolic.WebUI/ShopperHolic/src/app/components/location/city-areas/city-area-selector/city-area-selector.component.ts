import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { CityAreaService } from 'src/app/services/location/city-area.service';
import { CityAreaComponent } from '../city-area/city-area.component';

@Component({
  selector: 'app-city-area-selector',
  templateUrl: './city-area-selector.component.html',
  styleUrls: ['./city-area-selector.component.css']
})
export class CityAreaSelectorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.CITYAREA_PRVW_SELECT_COLUMNS;

  constructor(public service: CityAreaService, public childDialog: MatDialog, public ownDialog: MatDialogRef<CityAreaSelectorComponent>) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.childDialog.open(CityAreaComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted && resp.newModel) { 
        this.ownDialog.close({ selectedModel: resp.newModel}); 
      }
      obs.unsubscribe();
    });
  }

  public selectClicked(id: number) {
    let obs = this.service.getByID(id).subscribe(modelResp => {
      obs.unsubscribe();
      this.ownDialog.close({ selectedModel: modelResp});
    })
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }

  public closeClicked() { this.ownDialog.close(); }

}
