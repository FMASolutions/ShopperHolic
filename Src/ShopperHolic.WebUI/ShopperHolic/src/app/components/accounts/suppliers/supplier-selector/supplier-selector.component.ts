import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, Sort } from '@angular/material';
import { Globals } from 'src/globals';
import { SupplierService } from 'src/app/services/accounts/supplier.service';
import { SupplierComponent } from '../supplier/supplier.component';

@Component({
  selector: 'app-supplier-selector',
  templateUrl: './supplier-selector.component.html',
  styleUrls: ['./supplier-selector.component.css']
})
export class SupplierSelectorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnList: string[] = Globals.SUPPLIER_PRVW_SELECT_COLUMNS;

  constructor(private service: SupplierService, public childDialog: MatDialog, public ownDialog: MatDialogRef<SupplierSelectorComponent>) { }

  ngOnInit() { setTimeout(() => { this.service.refreshListData(this.paginator); }, 1); }

  public createClicked() {
    let dialogRef = this.childDialog.open(SupplierComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    let obs = dialogRef.afterClosed().subscribe((resp) => {
      if (resp && resp.userSubmitted && resp.newModel) {
        this.ownDialog.close({ selectedModel: resp.newModel });
      }
      obs.unsubscribe();
    });
  }

  public selectClicked(id: number) {
    let obs = this.service.getByID(id).subscribe(modelResp => {
      obs.unsubscribe();
      this.ownDialog.close({ selectedModel: modelResp });
    })
  }

  public closeClicked() {
    this.ownDialog.close();
  }

  public sortClicked(sort: Sort) { this.service.sortTableData(sort, this.paginator); }
}
