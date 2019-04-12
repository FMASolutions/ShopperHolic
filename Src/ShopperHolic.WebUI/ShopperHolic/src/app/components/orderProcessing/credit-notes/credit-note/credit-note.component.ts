import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { CreditNoteService } from 'src/app/services/orderProcessing/credit-note.service';
import { ActivatedRoute } from '@angular/router';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.css']
})
export class CreditNoteComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnList: string[] = Globals.CREDIT_NOTE_ITEM_PRVW_LIST_COLUMNS;
  currentRMAHeaderID: number = 0;

  constructor(public service: CreditNoteService, private route: ActivatedRoute, private navService: AppNavigationService) { 
    service.InitializeForm();
    let id = Number(this.route.snapshot.queryParams['id']);
    if (id > 0 && isNumber(id)) {
      let obs = this.service.getByID(id).subscribe(modelResp => {
        this.currentRMAHeaderID = modelResp[0].rmaid;
        this.service.populateFormFromModel(modelResp, this.paginator);
        obs.unsubscribe();
      })
    };
  }

  public goToRMAClicked(){
    this.navService.goToRMAPage(this.currentRMAHeaderID);
  }

  public sortClicked(sort: Sort) { this.service.sortCreditNoteItemTableData(sort, this.paginator); }

}
