import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { RmaService } from 'src/app/services/orderProcessing/rma.service';
import { ActivatedRoute } from '@angular/router';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';
import { isNumber } from 'util';
import { CreditNotesComponent } from '../../credit-notes/credit-notes.component';
import { ReturnNotesComponent } from '../../return-notes/return-notes.component';
import { RmaItemDetailComponent } from '../rma-item-detail/rma-item-detail.component';

@Component({
  selector: 'app-rma',
  templateUrl: './rma.component.html',
  styleUrls: ['./rma.component.css']
})
export class RmaComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ReturnNotesComponent) childReturnNotes;
  @ViewChild(CreditNotesComponent) childCreditNotes;

  columnList: string[] = Globals.RMA_ITEM_LIST_COUMNS;
  receivedRMAHeader: number = 0;
  receivedOrderID: number = 0;
  public hasCreditNotes: boolean = true;
  public hasReturnNotes: boolean = true;

  constructor(public service: RmaService, private route: ActivatedRoute, private navService: AppNavigationService, public childDialog: MatDialog) {
    this.service.initializeDetailedRMAForm();
    let id = Number(this.route.snapshot.queryParams['id']);
    if (id > 0 && isNumber(id)) {
      this.receivedRMAHeader = id;
      let obs = this.service.getByID(id).subscribe(modelResp => {
        this.receivedOrderID = modelResp.header.orderID;
        this.service.populateDetailedRMAFormFromModel(modelResp, this.paginator);
        this.childReturnNotes.refreshReturnNoteTableData(modelResp.returnNotes);
        this.childCreditNotes.refreshCreditNoteTableData(modelResp.creditNotes);
        this.hasCreditNotes = (modelResp.creditNotes.length > 0) ? true : false;
        this.hasReturnNotes = (modelResp.returnNotes.length > 0) ? true : false;
        obs.unsubscribe();
      })
    };
  }

  public deleteRMAClicked() {
    if (confirm(Globals.RMA_DELETE_CONFIRM_MSG + this.receivedRMAHeader)) {
      let obs = this.service.delete(this.receivedRMAHeader).subscribe(resp => {
        this.navService.goToRMAsPage();
        obs.unsubscribe();
      });
    }
  }

  public viewOrderClicked() {
    this.navService.goToOrderPage(this.receivedOrderID);
  }

  public creditRMAClicked() {
    if (confirm("Are you sure you wish to credit the outstanding items?")){
      this.service.creditRMAAndDisplayCreditNote(this.receivedRMAHeader);
    }
  }

  public processReturnClicked() {
    if (confirm("Are you sure you wish to return the outstanding items?")){
      this.service.returnRMAAndDisplayReturnNote(this.receivedRMAHeader);
    }
  }

  public editItemClicked(id: number) {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = {
      rmaItemID : id,
      orderID: this.service.detailedRMAForm.value["orderID"]
    }
    
    let dialogRef = this.childDialog.open(RmaItemDetailComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshItemListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public addItemClicked() {
    let modalSettings = Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS;
    modalSettings.data = {
      orderID: this.service.detailedRMAForm.value["orderID"]
    };
    let dialogRef = this.childDialog.open(RmaItemDetailComponent, modalSettings);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted) { this.service.refreshItemListData(this.paginator); }
      obs.unsubscribe();
    });
  }

  public removeItemClicked(id: number) {
    let obs = this.service.removeItemFromRMA(id).subscribe(resp => {
      this.service.removeRMAItemFromTable(id);
      obs.unsubscribe();
    });
  }

  public sortClicked(sort: Sort) { this.service.sortItemTableData(sort, this.paginator); }

}
