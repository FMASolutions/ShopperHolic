import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';
import { ProductGroupService } from 'src/app/services/stock/productGroup/product-group.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, Sort, MatDialog } from '@angular/material';
import { ProductGroupComponent } from '../product-group/product-group.component';
import { StatusMessageService } from 'src/app/services/generic/status-message.service';
import { Globals } from 'src/globals';
import { LoadingSpinnerService } from 'src/app/services/generic/loading-spinner.service';

@Component({
  selector: 'app-product-group-list',
  templateUrl: './product-group-list.component.html',
  styleUrls: ['./product-group-list.component.css']
})
export class ProductGroupListComponent implements OnInit {

  prodGroupPreviewsFromServer: ProductGroupPreview[] = [];
  prodGroupPreviewsFiltered: ProductGroupPreview[] = [];
  tableDataSource: MatTableDataSource<ProductGroupPreview>;

  textFilter: string = "";
  displayedColumns: string[] = Globals.PROD_GROUP_PRVW_LIST_COLUMNS;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sms: StatusMessageService, private prodGroupService: ProductGroupService, public prodDialog: MatDialog, public spinner: LoadingSpinnerService) { }

  ngOnInit() { this.refreshAndApplyFilter(); }









  

























  editClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = id;
    let dialogRef = this.prodDialog.open(ProductGroupComponent, modalSettings)

    dialogRef.afterClosed().subscribe(result => {
      this.refreshAndApplyFilter();
    })
  }

  deleteClicked(id: number) {
    if (confirm(Globals.PROD_GROUP_DELETE_CONFIRM_MSG + id)) {
      this.spinner.showSpinner(Globals.SPINNER_DELETE_MESSAGE);
      this.sms.setWarningMessage(Globals.PROD_GROUP_DELETE_ATTEMPT_MSG + id);
      this.prodGroupService.delete(id).subscribe(deleteResp => {
        this.sms.setSuccessMessage(Globals.PROD_GROUP_DELETE_SUCCESS_MSG + id);
        this.spinner.hideSpinner();
        this.refreshAndApplyFilter();
      }, error => {
        this.spinner.hideSpinner();
        this.sms.setDangerMessage(error.error);
        this.sms.setDangerMessage(Globals.PROD_GROUP_DELETE_FAILED_MSG + id);
      });
    }
  }

  requestNew() {
    let dialogRef = this.prodDialog.open(ProductGroupComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);

    dialogRef.afterClosed().subscribe(result => {
      this.refreshAndApplyFilter();
    })
  }

  refreshAndApplyFilter() {
    this.spinner.showSpinner(Globals.SPINNER_GET_MESSAGE);
    this.prodGroupService.getAll().subscribe(prodResp => {
      this.spinner.hideSpinner();
      
      if (this.prodGroupPreviewsFromServer) { this.prodGroupPreviewsFromServer = []; }

      prodResp.forEach(current => {
        this.applyFilter(current);
        this.prodGroupPreviewsFromServer.push(current);
      })

      this.tableDataSource = new MatTableDataSource(this.prodGroupPreviewsFiltered);
      this.tableDataSource.paginator = this.paginator;
      this.spinner.hideSpinner();
    });
  }

  sortData(sort: Sort) {
    this.spinner.showSpinner(Globals.SPINNER_SORT_MESSAGE);
    const data = this.prodGroupPreviewsFiltered.slice();
    if (!sort.active || sort.direction === '') {
      this.spinner.hideSpinner();
      this.tableDataSource = new MatTableDataSource(data);
      this.tableDataSource.paginator = this.paginator;
      return;
    }

    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return this.compare(a.productGroupID, b.productGroupID, isAsc);
        case 'Code': return this.compare(a.productGroupCode.toLowerCase(), b.productGroupCode.toLowerCase(), isAsc);
        case 'Name': return this.compare(a.productGroupName.toLowerCase(), b.productGroupName.toLowerCase(), isAsc);
        default: return 0;
      }
    });

    this.tableDataSource = new MatTableDataSource(sortedData);
    this.tableDataSource.paginator = this.paginator;
    this.spinner.hideSpinner();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) { return (a < b ? -1 : 1) * (isAsc ? 1 : -1); }

  resetFilters() {
    this.textFilter = "";
    this.refreshAndApplyFilter();
  }

  applyFilters() {
    this.spinner.showSpinner(Globals.SPINNER_FILTER_MESSAGE);
    setTimeout(function(){
      
    },10000);
    this.prodGroupPreviewsFiltered = [];
    this.prodGroupPreviewsFromServer.forEach(current => {
      this.applyFilter(current);
    });
    if(this.tableDataSource){ this.tableDataSource.filter = this.textFilter.trim().toLowerCase();}

    if (this.tableDataSource.paginator) { this.tableDataSource.paginator.firstPage(); }

    this.spinner.hideSpinner();
  }

  private applyFilter(item: ProductGroupPreview) {
    if (this.textFilter) { //Both filters contain values
      if (item.productGroupCode.toLowerCase().indexOf(this.textFilter.toLowerCase()) >= 0
        || item.productGroupName.toLowerCase().indexOf(this.textFilter.toLowerCase()) >= 0) {
        this.prodGroupPreviewsFiltered.push(item);
      }
    }
    else { //No filters present so always add the item.
      this.prodGroupPreviewsFiltered.push(item);
    }
  }


}
