import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryNoteService } from 'src/app/services/orderProcessing/delivery-note.service';
import { Sort, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'util';
import { Globals } from 'src/globals';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';

@Component({
  selector: 'app-delivery-note',
  templateUrl: './delivery-note.component.html',
  styleUrls: ['./delivery-note.component.css']
})
export class DeliveryNoteComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnList: string[] = Globals.DELIVERY_NOTE_ITEM_PRVW_LIST_COLUMNS;
  currentOrderHeaderID: number = 0;

  constructor(public service: DeliveryNoteService, private route: ActivatedRoute, private navService: AppNavigationService) { 
    service.InitializeForm();
    let id = Number(this.route.snapshot.queryParams['id']);
    if (id > 0 && isNumber(id)) {
      let obs = this.service.getByID(id).subscribe(modelResp => {
        this.currentOrderHeaderID = modelResp[0].orderHeaderID;
        this.service.populateFormFromModel(modelResp, this.paginator);
        obs.unsubscribe();
      })
    };
  }

  public goToOrderClicked(){
    this.navService.goToOrderPage(this.currentOrderHeaderID);
  }

  public sortClicked(sort: Sort) { this.service.sortDeliveryNoteItemTableData(sort, this.paginator); }
}
