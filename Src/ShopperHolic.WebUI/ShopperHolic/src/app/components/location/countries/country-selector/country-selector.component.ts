import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { CountryService } from 'src/app/services/location/country.service';
import { CountryComponent } from '../country/country.component';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css']
})
export class CountrySelectorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.COUNTRY_PRVW_SELECT_COLUMNS;

  constructor(private service: CountryService, public prodDialog: MatDialog, public dialogRef: MatDialogRef<CountrySelectorComponent>) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.prodDialog.open(CountryComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted && resp.newModel) {
        this.dialogRef.close({ selectedModel: resp.newModel });
      }
      obs.unsubscribe();
    });
  }

  public selectClicked(id: number) {
    let obs = this.service.getByID(id).subscribe(modelResp => {
      obs.unsubscribe();
      this.dialogRef.close({ selectedModel: modelResp });
    })
  }

  public closeClicked() {
    this.dialogRef.close();
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }

}
