import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductGroupService } from 'src/app/services/stock/productGroup/product-group.service';
import { ProductGroupValidator } from 'src/app/services/stock/productGroup/product-group-validator';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

  prodForm: FormGroup;
  currentMode: string;

  constructor(
    fb: FormBuilder,
    private prodService: ProductGroupService,
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
    if (this.currentMode == Globals.PROD_GROUP_UPDATE_MODE) { return Globals.PROD_GROUP_UPDATE_TITLE; }
    else if (this.currentMode == Globals.PROD_GROUP_CREATE_MODE) { return Globals.PROD_GROUP_CREATE_TITLE; }
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
    this.prodService.update(this.getUpdateModelFromForm()).subscribe(updateResp => {
      this.dialogRef.close({ userSubmitted: true });
    }, error => {
    });
  }

  private requestCreate() {
    this.prodService.createNewProduct(this.getCreateModelFromForm())
      .subscribe(createResp => {
        this.dialogRef.close({ userSubmitted: true });
      }, error => {
      });
  }

}
