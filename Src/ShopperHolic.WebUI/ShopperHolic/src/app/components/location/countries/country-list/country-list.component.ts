import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { CountryService } from 'src/app/services/location/country.service';
import { CountryComponent } from '../country/country.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.COUNTRY_PRVW_LIST_COLUMNS;

  constructor(public service: CountryService, public childDialog: MatDialog) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.childDialog.open(CountryComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.childDialog.open(CountryComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.COUNTRY_DELETE_CONFIRM_MSG + id)) {
      let obs = this.service.delete(id).subscribe(() => {
        this.service.refreshListData(this.paginator);
        obs.unsubscribe();
      });
    }
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }

}
