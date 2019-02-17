import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { CreditNoteService } from 'src/app/services/orderProcessing/credit-note.service';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';
import { CreditNotePreview } from 'src/app/models/orderProcessing/creditNotes/creditNotePreview';

@Component({
  selector: 'app-credit-notes',
  templateUrl: './credit-notes.component.html',
  styleUrls: ['./credit-notes.component.css']
})
export class CreditNotesComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnList: string[] = Globals.CREDIT_NOTE_PRVW_LIST_COLUMNS;

  constructor(public service: CreditNoteService, private navService: AppNavigationService) { }

  public selectClicked(id: number) {
    this.navService.goToCreditNotePage(id);
  }

  public refreshCreditNoteTableData(creditNotes: CreditNotePreview[]){
    this.service.refreshCreditNoteListData(this.paginator, creditNotes);
  }

  public sortClicked(sort: Sort) { this.service.sortCreditNoteTableData(sort, this.paginator); }
}
