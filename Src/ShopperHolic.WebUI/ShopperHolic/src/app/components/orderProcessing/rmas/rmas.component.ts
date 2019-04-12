import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { RmaService } from 'src/app/services/orderProcessing/rma.service';
import { RmaDetailComponent } from './rma-detail/rma-detail.component';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-rmas',
  templateUrl: './rmas.component.html',
  styleUrls: ['./rmas.component.css']
})
export class RmasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public service: RmaService, public childDialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => { this.service.refreshListData(this.paginator); }, 1);
  }

  public createClicked(){
    let dialogRef = this.childDialog.open(RmaDetailComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
  }
}
