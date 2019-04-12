import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { RmaService } from 'src/app/services/orderProcessing/rma.service';
import { AppNavigationService } from 'src/app/services/generic/app-navigation.service';
import { RMAPreview } from 'src/app/models/orderProcessing/rmas/rmaPreview';

@Component({
  selector: 'app-rma-list',
  templateUrl: './rma-list.component.html',
  styleUrls: ['./rma-list.component.css']
})
export class RmaListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.RMA_PRVW_LIST_COLUMNS;

  constructor(public service: RmaService, public childDialog: MatDialog, private navService: AppNavigationService) { }

  ngOnInit() {  }

  public editClicked(id: number) {
    this.navService.goToRMAPage(id);
  }

  public deleteClicked(id: number) {
    if (confirm(Globals.RMA_DELETE_CONFIRM_MSG + id)) {
      let obs = this.service.delete(id).subscribe(() => {
        this.service.refreshListData(this.paginator);
        obs.unsubscribe();
      });
    }
  }

  public refreshRMATableData(rmas?: RMAPreview[]){
    if(rmas)
      this.service.refreshListData(this.paginator, rmas);
    else
      this.service.refreshListData(this.paginator);
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }

}
