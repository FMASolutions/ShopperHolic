import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { ReturnNoteService } from 'src/app/services/orderProcessing/return-note.service';
import { ActivatedRoute } from '@angular/router';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-return-note',
  templateUrl: './return-note.component.html',
  styleUrls: ['./return-note.component.css']
})
export class ReturnNoteComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnList: string[] = Globals.RETURN_NOTE_ITEM_PRVW_LIST_COLUMNS;
  currentRMAHeaderID: number = 0;

  constructor(public service: ReturnNoteService, private route: ActivatedRoute, private navService: AppNavigationService) { 
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

  public sortClicked(sort: Sort) { this.service.sortReturnNoteItemTableData(sort, this.paginator); }

}
