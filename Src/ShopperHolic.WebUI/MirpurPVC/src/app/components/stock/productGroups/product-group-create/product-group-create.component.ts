import { Component, OnInit } from '@angular/core';
import { ProductGroupService } from '../../../../services/stock/product-group.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductGroupValidator } from 'src/app/services/stock/product-group-validator';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { StatusMessage } from 'src/app/models/statusModel';

@Component({
  selector: 'app-product-group-create',
  templateUrl: './product-group-create.component.html',
  styleUrls: ['./product-group-create.component.css']
})
export class ProductGroupCreateComponent implements OnInit {

  statusMessage: StatusMessage = new StatusMessage();
  newProdForm: FormGroup;

  constructor(private prodGroupService: ProductGroupService, private fb: FormBuilder, private pgValidator: ProductGroupValidator) {
    this.newProdForm = this.fb.group({
      code: [null, [pgValidator.validateCodeForCreate]],
      name: [null, [pgValidator.basicValidation]],
      desc: [null, [pgValidator.basicValidation]]
    });
  }

  ngOnInit() { }

  createProductGroup() {
    if (this.newProdForm.valid) {
      this.prodGroupService.createNewProduct(this.getModelFromCurrentForm())
        .subscribe(resp => {
          this.goToProductDetailPage(resp.productGroupID);
        }, error => {
          this.statusMessage.updateCurrentStatusFromError(error);
        });
    }
  }

  private getModelFromCurrentForm(): CreateProductGroup {
    let newProdGroup: CreateProductGroup = {
      productGroupCode: this.newProdForm.value["code"],
      productGroupName: this.newProdForm.value["name"],
      productGroupDescription: this.newProdForm.value["desc"]
    };
    return newProdGroup;
  }

  private goToProductDetailPage(prodGroupID: number) {
    this.statusMessage.setSuccessMessage("Create Completed Successfully");
    this.prodGroupService.goToProductGroupDetail(prodGroupID, this.statusMessage.getCurrentMessageAsUrlParameter());
  }
}
