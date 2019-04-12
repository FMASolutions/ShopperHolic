import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';
import { ReturnNoteService } from 'src/app/services/orderProcessing/return-note.service';
import { ReturnNotePreview } from 'src/app/models/orderProcessing/returnNotes/returnNotePreview';

@Component({
  selector: 'app-return-notes',
  templateUrl: './return-notes.component.html',
  styleUrls: ['./return-notes.component.css']
})
export class ReturnNotesComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnList: string[] = Globals.RETURN_NOTE_PRVW_LIST_COLUMNS;

  constructor(public service: ReturnNoteService, private navService: AppNavigationService) { }

  public selectClicked(id: number) {
    this.navService.goToReturnNotePage(id);
  }

  public refreshReturnNoteTableData(returnNotes: ReturnNotePreview[]){
    this.service.refreshReturnNoteListData(this.paginator, returnNotes);
  }

  public sortClicked(sort: Sort) { this.service.sortReturnNoteTableData(sort, this.paginator); }

}
