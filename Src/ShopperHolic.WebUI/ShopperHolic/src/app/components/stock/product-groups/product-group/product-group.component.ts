import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductGroupService } from 'src/app/services/stock/productGroup/product-group.service';
import { ProductGroupValidator } from 'src/app/services/stock/productGroup/product-group-validator';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { StatusMessageService } from 'src/app/services/status-message.service';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

  prodForm: FormGroup;

  constructor(private sms: StatusMessageService, fb: FormBuilder, private prodService: ProductGroupService, pgValidator: ProductGroupValidator, public dialogRef: MatDialogRef<ProductGroupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.prodForm = fb.group({
      id: [0, []],
      code: [null, [pgValidator.validateCodeForCreate]],
      name: [null, [pgValidator.basicValidation]],
      desc: [null, [pgValidator.basicValidation]],
    });
  }

  ngOnInit() {
    if (this.data && this.data.productGroupID) { //All data received, populate as is
      this.populateFormFromModel(this.data);
    } else if (this.data) { //Recevied only ID, perform search
      this.prodService.getByID(this.data).subscribe(respData => {
        this.populateFormFromModel(respData);
      })
    } else { // It's a create request 
    }
  }

  submit() {
    if (this.prodForm.valid) {
      if (this.data) { //Data Passed in, we need to do an update, not a created...
        
        this.prodService.update(this.getUpdateModelFromForm()).subscribe(updateResp => {
          this.sms.currentMessage.setSuccessMessage("Product Group: " + updateResp.productGroupCode + " Updated successfully");
          this.dialogRef.close();
        }, error => {
          this.sms.currentMessage.setDangerMessage(error.error);
        });
      } else {
        this.prodService.createNewProduct(this.getCreateModelFromForm())
          .subscribe(resp => {
            this.sms.currentMessage.setSuccessMessage("Product Group " + resp.productGroupID + " Created Successfully... Closing");
            this.dialogRef.close();
          }, error => {
            this.sms.currentMessage.setDangerMessage(error.error);
          });
      }
    }
  }

  cancel() {
    this.dialogRef.close("Cancelled by user");
  }

  getCreateModelFromForm(): CreateProductGroup {
    let newProdGroup: CreateProductGroup = {
      productGroupCode: this.prodForm.value["code"],
      productGroupName: this.prodForm.value["name"],
      productGroupDescription: this.prodForm.value["desc"]
    };
    return newProdGroup;
  }

  getUpdateModelFromForm(): ProductGroup {
    let newProdGroup: ProductGroup = {
      productGroupID: this.prodForm.value["id"],
      productGroupCode: this.prodForm.value["code"],
      productGroupName: this.prodForm.value["name"],
      productGroupDescription: this.prodForm.value["desc"]
    }
    return newProdGroup;
  }

  populateFormFromModel(model: ProductGroup) {
    this.prodForm.setValue({
      id: model.productGroupID,
      code: model.productGroupCode,
      name: model.productGroupName,
      desc: model.productGroupDescription
    });
  }

}
