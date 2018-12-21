import { Component, OnInit } from '@angular/core';
import { ProductGroupService } from '../../../../services/stock/product-group.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductGroupValidator } from 'src/app/services/stock/product-group-validator';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { StatusMessageService } from 'src/app/services/status-message.service';

@Component({
  selector: 'app-product-group-create',
  templateUrl: './product-group-create.component.html',
  styleUrls: ['./product-group-create.component.css']
})
export class ProductGroupCreateComponent implements OnInit {

  statusMessage: string = "";
  statusMessageClass: string = "";
  newProdForm: FormGroup;

  constructor(
    private prodGroupService: ProductGroupService,
    private router: Router,
    private fb: FormBuilder,
    private pgValidator: ProductGroupValidator,
    private sms: StatusMessageService
  ) {
    this.newProdForm = this.fb.group({
      code: [null, [pgValidator.validateCodeForCreate]],
      name: [null, [pgValidator.basicValidation]],
      desc: [null, [pgValidator.basicValidation]]
    });
  }

  ngOnInit() {
  }
  //TODO ADD submit on enter
  createProductGroup() {
    if (this.newProdForm.valid) {
      let newProdGroup: CreateProductGroup = {
        productGroupCode: this.newProdForm.value["code"],
        productGroupName: this.newProdForm.value["name"],
        productGroupDescription: this.newProdForm.value["desc"]
      };

      this.prodGroupService.createNewProduct(newProdGroup).subscribe(resp => {
        let navUrl = "/ProductGroupDetail?id=" + resp.productGroupID;
        navUrl += "&" + this.sms.generateSuccessQueryParam("Create Completed Successfully!");
        this.router.navigateByUrl(navUrl);
      }, error => {
        this.statusMessage = error.error;
        this.statusMessageClass = "alert alert-danger";
      });
    }
  }

}
