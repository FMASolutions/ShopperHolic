import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeliveryNotePreview } from 'src/app/models/orderProcessing/deliveryNotes/deliveryNotePreview';
import { MatPaginator, MatSort, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { DeliveryNoteService } from 'src/app/services/orderProcessing/delivery-note.service';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';

@Component({
selector: 'app-delivery-notes',
  templateUrl: './delivery-notes.component.html',
  styleUrls: ['./delivery-notes.component.css']
})
export class DeliveryNotesComponent {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnList: string[] = Globals.DELIVERY_NOTE_PRVW_LIST_COLUMNS;

  constructor(public service: DeliveryNoteService, private navService: AppNavigationService) { }

  public selectClicked(id: number) {
    this.navService.goToDeliveryNotePage(id);
  }

  public refreshDeliveryNoteTableData(deliveryNotes: DeliveryNotePreview[]){
    this.service.refreshDeliveryNoteListData(this.paginator, deliveryNotes);
  }

  public sortClicked(sort: Sort) { this.service.sortDeliveryNoteTableData(sort, this.paginator); }

}
