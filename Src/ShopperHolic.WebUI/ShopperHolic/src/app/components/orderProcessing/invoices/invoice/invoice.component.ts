import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { InvoiceService } from 'src/app/services/orderProcessing/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnList: string[] = Globals.INVOICE_ITEM_PRVW_LIST_COLUMNS;
  currentOrderHeaderID: number = 0;

  constructor(public service: InvoiceService, private route: ActivatedRoute, private navService: AppNavigationService) { 
    service.InitializeForm();
    let id = Number(this.route.snapshot.queryParams['id']);
    if (id > 0 && isNumber(id)) {
      let obs = this.service.getByID(id).subscribe(modelResp => {
        this.currentOrderHeaderID = modelResp[0].orderID;
        this.service.populateFormFromModel(modelResp, this.paginator);
        obs.unsubscribe();
      })
    };
  }

  public goToOrderClicked(){
    this.navService.goToOrderPage(this.currentOrderHeaderID);
  }

  public sortClicked(sort: Sort) { this.service.sortInvoiceItemTableData(sort, this.paginator); }

}
