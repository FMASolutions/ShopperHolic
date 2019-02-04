import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoicesComponent } from '../invoices.component';
import { InvoiceService } from 'src/app/services/orderProcessing/invoice.service';

@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.css']
})
export class AllInvoicesComponent implements OnInit {

  @ViewChild(InvoicesComponent) childInvoices;

  constructor(public service: InvoiceService) { }

  ngOnInit() {
    setTimeout(() => {
      let obs = this.service.getAll().subscribe(modelResp => {
        this.childInvoices.refreshInvoiceTableData(modelResp);
        obs.unsubscribe();
      })
    }, 1);
  }

}
