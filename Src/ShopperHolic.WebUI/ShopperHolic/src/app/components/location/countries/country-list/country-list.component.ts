import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { Country } from 'src/app/models/location/countries/country';
import { Globals } from 'src/globals';
import { CountryService } from 'src/app/services/location/country.service';
import { CountryComponent } from '../country/country.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  tableDataSource: MatTableDataSource<Country>;
  textFilter: string = "";
  displayedColumns: string[] = Globals.COUNTRY_PRVW_LIST_COLUMNS

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private countryService: CountryService, public countryDialog: MatDialog) { }

  ngOnInit() {
    setTimeout(()=>{ 
      this.refreshDatasource();
    },1); 
  }

  public createClicked() {
    let dialogRef = this.countryDialog.open(CountryComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted) { this.refreshDatasource(); }
      obs.unsubscribe();
    });
  }

  public editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;

    let dialogRef = this.countryDialog.open(CountryComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => { 
      if (resp && resp.userSubmitted) { this.refreshDatasource(); }
      obs.unsubscribe(); 
    });
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.COUNTRY_DELETE_CONFIRM_MSG + id)) {
      let obs = this.countryService.delete(id).subscribe(() => { 
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
        case 'ID': return this.compare(a.countryID, b.countryID, isAsc);
        case 'Code': return this.compare(a.countryCode.toLowerCase(), b.countryCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.countryName.toLowerCase(), b.countryName.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.setupTableDataSource(sortedData);
  }

  private setupTableDataSource(data: Country[]) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.filter = this.textFilter;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }

  private refreshDatasource() {
    let obs = this.countryService.getAll().subscribe(prodGroupsResp => {
      this.setupTableDataSource(prodGroupsResp);
      obs.unsubscribe();
    })
  }

}
