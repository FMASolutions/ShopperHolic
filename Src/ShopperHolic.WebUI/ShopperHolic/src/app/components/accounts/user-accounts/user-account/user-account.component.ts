import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UserAccountService } from 'src/app/services/accounts/user-account.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatPaginator, MatSort, Sort } from '@angular/material';
import { UserAccountsComponent } from '../user-accounts.component';
import { Globals } from 'src/globals';
import { CustomerSelectorComponent } from '../../customers/customer-selector/customer-selector.component';
import { SupplierSelectorComponent } from '../../suppliers/supplier-selector/supplier-selector.component';
import { CustomerLogin } from 'src/app/models/security/customerLogin';
import { SupplierLogin } from 'src/app/models/security/supplierLogin';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {

  currentMode: string = "";
  isUpdateMode: boolean = false;
  public updatePasswordRequested: boolean = false;

  @ViewChild(MatPaginator) supplierPaginator: MatPaginator;
  @ViewChild(MatSort) supplierSort: MatSort;
  @ViewChild(MatPaginator) customerPaginator: MatPaginator;
  @ViewChild(MatSort) customerSort: MatSort;
  
  customerColumnList: string[] = Globals.USER_LINKED_ACCT_COLUMNS;
  supplierColumnList: string[] = Globals.USER_LINKED_ACCT_COLUMNS;

  constructor(public service: UserAccountService, @Inject(MAT_DIALOG_DATA) public data: any, public ownDialog: MatDialogRef<UserAccountsComponent>, public childDialog: MatDialog) {
    this.currentMode = this.service.InitializeForm(data, this.customerPaginator, this.supplierPaginator);
    if(this.currentMode == Globals.MODE_UPDATE)
      this.isUpdateMode = true;

  }

  getPageTitle() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.CUSTOMER_UPDATE_TITLE : Globals.CUSTOMER_CREATE_TITLE; }

  getSubmitButtonText() { return (this.currentMode == Globals.MODE_UPDATE) ? Globals.UPDATE_BUTTON_TEXT : Globals.CREATE_BUTTON_TEXT; }

  submit() {
    if (this.service.userForm.valid) {
      if (this.currentMode == Globals.MODE_UPDATE) {
        let obs = this.service.update(this.service.getUpdateModelFromForm()).subscribe(updateResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: updateResp  });
          obs.unsubscribe();
        });

      } else if (this.currentMode == Globals.MODE_CREATE) {
        let obs = this.service.createNew(this.service.getCreateModelFromForm()).subscribe(createResp => {
          this.ownDialog.close({ userSubmitted: true, newModel: createResp });
          obs.unsubscribe();
        });
      }
    }
  }

  cancel() { this.ownDialog.close(); }
  
  public deleteCustomerClicked(id: number) {
    if (confirm(Globals.CUSTOMER_DELETE_CONFIRM_MSG + id)) {
      this.service.removeCustomerForCurrentUser(id);
    }
  }

  public deleteSupplierClicked(id: number) {
    if (confirm(Globals.SUPPLIER_DELETE_CONFIRM_MSG + id)) {
      this.service.removeSupplierForCurrentUser(id);
    }
  }

  public linkCustomerClicked(){
    let newLogin: CustomerLogin = new CustomerLogin();
    let dialogRef = this.childDialog.open(CustomerSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      if (resp && resp.selectedModel) {
        newLogin.customerCode = resp.selectedModel.customerCode;
        newLogin.customerName = resp.selectedModel.customerName;
        newLogin.customerID = resp.selectedModel.customerID;
        this.service.addCustomerForCurrentUser(newLogin);
      }
    })
  }

  public linkSupplierClicked(){
    let newLogin: SupplierLogin = new SupplierLogin();
    let dialogRef = this.childDialog.open(SupplierSelectorComponent, Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
    dialogRef.afterClosed().subscribe(resp => {
      newLogin.supplierID = resp.selectedModel.supplierID;
      newLogin.supplierCode = resp.selectedModel.supplierCode;
      newLogin.supplierName = resp.selectedModel.supplierName;
      if (resp && resp.selectedModel) {
        this.service.addSupplierForCurrentUser(newLogin);
      }
    })
  }

  public updatePasswordChanged(){ this.updatePasswordRequested = !this.updatePasswordRequested;}
  public sortSupplierClicked(sort: Sort) { this.service.sortSupplierTableData(sort, this.supplierPaginator); }
  public sortCustomerClicked(sort: Sort) { this.service.sortCustomerTableData(sort, this.customerPaginator); }
}
