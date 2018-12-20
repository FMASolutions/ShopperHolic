import { Component, OnInit } from '@angular/core';
import { ProductGroupService } from '../../../../services/stock/product-group.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductGroupValidator } from 'src/app/services/stock/product-group-validator';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';

@Component({
  selector: 'app-product-group-create',
  templateUrl: './product-group-create.component.html',
  styleUrls: ['./product-group-create.component.css']
})
export class ProductGroupCreateComponent implements OnInit {

  statusMessage: string = "";
  newProdForm: FormGroup;
  constructor(private prodGroupService: ProductGroupService, private router: Router, private fb: FormBuilder, pgValidator: ProductGroupValidator) {
    //TODO NEED TO BIND VALIDATION MESSAGES TO HTML AND USE NGIF ETC.....
    this.newProdForm = this.fb.group({
      code: [null, [pgValidator.validateCodeForCreate]],
      name: [null, [pgValidator.basicValidation]],
      desc: [null, [pgValidator.basicValidation]]
    });
  }

  ngOnInit() {
  }

  //TODO Add Validation
  createProductGroup() {
    console.log(this.newProdForm);

    if (this.newProdForm.valid) {
      let newProdGroup: CreateProductGroup = {
        productGroupCode: this.newProdForm.value["code"],
        productGroupName: this.newProdForm.value["name"],
        productGroupDescription: this.newProdForm.value["desc"]
      };

      this.prodGroupService.createNewProduct(newProdGroup).subscribe(resp => {
        let navUrl = "/ProductGroupDetail?id=" + resp.productGroupID;
        navUrl += "&code=" + resp.productGroupCode;
        navUrl += "&name=" + resp.productGroupName;
        navUrl += "&desc=" + resp.productGroupDescription;
        this.router.navigateByUrl(navUrl);
      }, error => {
        console.log("inside component error handler anonymous function");
        console.log(error);
        this.statusMessage = error.error;
      });
    }
  }

}
