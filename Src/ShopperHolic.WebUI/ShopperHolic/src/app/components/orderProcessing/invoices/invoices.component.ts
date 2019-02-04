import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { InvoiceService } from 'src/app/services/orderProcessing/invoice.service';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';
import { InvoicePreview } from 'src/app/models/orderProcessing/invoices/invoicePreview';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnList: string[] = Globals.INVOICE_PRVW_LIST_COLUMNS;

  constructor(public service: InvoiceService, private navService: AppNavigationService) { }

  public selectClicked(id: number) {
    this.navService.goToInvoicePage(id);
  }

  public refreshInvoiceTableData(invoices: InvoicePreview[]){
    this.service.refreshInvoiceListData(this.paginator, invoices);
  }

  public sortClicked(sort: Sort) { this.service.sortInvoiceTableData(sort, this.paginator); }

}
