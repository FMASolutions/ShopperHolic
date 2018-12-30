import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductGroupService } from 'src/app/services/stock/productGroup/product-group.service';
import { ProductGroupValidator } from 'src/app/services/stock/productGroup/product-group-validator';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { StatusMessageService } from 'src/app/services/generic/status-message.service';
import { Globals } from 'src/globals';
import { LoadingSpinnerService } from 'src/app/services/generic/loading-spinner.service';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

  prodForm: FormGroup;
  currentMode: string;

  constructor(
    private sms: StatusMessageService,
    fb: FormBuilder,
    private prodService: ProductGroupService,
    private spinner: LoadingSpinnerService,
    pgValidator: ProductGroupValidator,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductGroupComponent>
  ) {

    this.prodForm = fb.group({
      id: [0, []],
      code: [null, [pgValidator.validateCodeForCreate]],
      name: [null, [pgValidator.basicValidation]],
      desc: [null, [pgValidator.basicValidation]],
    });

  }

  ngOnInit() {
    if (this.data) {
      this.currentMode = Globals.PROD_GROUP_UPDATE_MODE;
      this.prodService.getByID(this.data).subscribe(respData => {
        this.populateFormFromModel(respData);
      })
    } else {
      this.currentMode = Globals.PROD_GROUP_CREATE_MODE;
    }
  }

  getPageTitle() {
    if (this.currentMode == Globals.PROD_GROUP_UPDATE_MODE) {
      return Globals.PROD_GROUP_UPDATE_TITLE;
    } else if (this.currentMode == Globals.PROD_GROUP_CREATE_MODE) {
      return Globals.PROD_GROUP_CREATE_TITLE;
    }
  }

  submit() {
    if (this.prodForm.valid) {
      if (this.currentMode == Globals.PROD_GROUP_UPDATE_MODE) {
        this.requestUpdate();

      } else if (this.currentMode == Globals.PROD_GROUP_CREATE_MODE) {
        this.requestCreate();
      }
    }
  }

  cancel() { this.dialogRef.close(); }

  private getCreateModelFromForm(): CreateProductGroup {
    let newProdGroup: CreateProductGroup = {
      productGroupCode: this.prodForm.value["code"],
      productGroupName: this.prodForm.value["name"],
      productGroupDescription: this.prodForm.value["desc"]
    };
    return newProdGroup;
  }

  private getUpdateModelFromForm(): ProductGroup {
    let newProdGroup: ProductGroup = {
      productGroupID: this.prodForm.value["id"],
      productGroupCode: this.prodForm.value["code"],
      productGroupName: this.prodForm.value["name"],
      productGroupDescription: this.prodForm.value["desc"]
    }
    return newProdGroup;
  }

  private populateFormFromModel(model: ProductGroup) {
    this.prodForm.setValue({
      id: model.productGroupID,
      code: model.productGroupCode,
      name: model.productGroupName,
      desc: model.productGroupDescription
    });
  }

  private requestUpdate() {
    this.sms.setInfoMessage(Globals.PROD_GROUP_UPDATE_ATTEMPT_MSG + this.prodForm.value["id"]);
    this.prodService.update(this.getUpdateModelFromForm()).subscribe(updateResp => {
      this.sms.setSuccessMessage(Globals.PROD_GROUP_UPDATE_SUCCESS_MSG + updateResp.productGroupID);
      this.dialogRef.close({userSubmitted: true});
    }, error => {
      this.sms.setDangerMessage(error.error);
      this.sms.setDangerMessage(Globals.PROD_GROUP_UPDATE_FAILED_MSG + this.prodForm.value["id"]);
    });
  }

  private requestCreate() {
    this.sms.setInfoMessage(Globals.PROD_GROUP_CREATE_ATTEMPT_MSG + this.prodForm.value["code"]);
    this.prodService.createNewProduct(this.getCreateModelFromForm())
      .subscribe(createResp => {
        this.sms.setSuccessMessage(Globals.PROD_GROUP_CREATE_SUCCESS_MSG + createResp.productGroupID);
        this.dialogRef.close({ userSubmitted: true});
      }, error => {
        this.sms.setDangerMessage(error.error);
        this.sms.setDangerMessage(Globals.PROD_GROUP_CREATE_FAILED_MSG + this.prodForm.value["id"]);
      });
  }

}
