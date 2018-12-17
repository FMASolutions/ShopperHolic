import { Component, OnInit } from '@angular/core';
import { ProductGroupService } from '../../../../services/stock/product-group.service';
import { CreateProductGroup } from 'src/app/models/stock/productGroups/createProductGroup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-group-create',
  templateUrl: './product-group-create.component.html',
  styleUrls: ['./product-group-create.component.css']
})
export class ProductGroupCreateComponent implements OnInit {

  newProdGroup: CreateProductGroup
  statusMessage: string = "";

  constructor(private prodGroupService: ProductGroupService, private router: Router) {
    this.newProdGroup = new CreateProductGroup();
  }

  ngOnInit() {
  }
  //TODO Add Validation
  createProductGroup() {
    this.prodGroupService.createNewProduct(this.newProdGroup).subscribe(resp => {
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
