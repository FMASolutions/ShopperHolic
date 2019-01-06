import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { CityService } from 'src/app/services/location/city.service';
import { CityComponent } from '../city/city.component';

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.css']
})
export class CitySelectorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.CITY_PRVW_SELECT_COLUMNS;

  constructor(public service: CityService, public childDialog: MatDialog, public ownDialog: MatDialogRef<CitySelectorComponent>) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.childDialog.open(CityComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
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
