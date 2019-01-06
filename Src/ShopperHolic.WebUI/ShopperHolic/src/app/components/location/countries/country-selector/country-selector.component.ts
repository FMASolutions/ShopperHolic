import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, Sort } from '@angular/material';
import { Country } from 'src/app/models/location/countries/country';
import { Globals } from 'src/globals';
import { CountryService } from 'src/app/services/location/country.service';
import { CountryComponent } from '../country/country.component';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css']
})
export class CountrySelectorComponent implements OnInit {

  tableDataSource: MatTableDataSource<Country>;
  textFilter: string = "";
  displayedColumns: string[] = Globals.COUNTRY_PRVW_SELECT_COLUMNS

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private countryService: CountryService, public prodDialog: MatDialog, public dialogRef: MatDialogRef<CountrySelectorComponent>) { }

  ngOnInit() {
    setTimeout(()=>{ 
      this.refreshDatasource();
    },1); 
  }

  public createClicked() {
    let dialogRef = this.prodDialog.open(CountryComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted && resp.createdCountry) { 
        this.dialogRef.close({ selectedCountry: resp.createdCountry}); 
      }
      obs.unsubscribe();
    });
  }

  public selectClicked(id: number) {
    let obs = this.countryService.getByID(id).subscribe(modelResp => {
      obs.unsubscribe();
      this.dialogRef.close({ selectedCountry: modelResp});
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
        case 'ID': return this.compare(a.countryID, b.countryID, isAsc);
        case 'Code': return this.compare(a.countryCode.toLowerCase(), b.countryCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.countryName.toLowerCase(), b.countryName.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.setupTableDataSource(sortedData);
  }

  public closeClicked(){
    this.dialogRef.close();
  }

  private setupTableDataSource(data: Country[]) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }

  private refreshDatasource() {
    let obs = this.countryService.getAll().subscribe(modelResp => {
      this.setupTableDataSource(modelResp);
      obs.unsubscribe();
    })
  }

}
