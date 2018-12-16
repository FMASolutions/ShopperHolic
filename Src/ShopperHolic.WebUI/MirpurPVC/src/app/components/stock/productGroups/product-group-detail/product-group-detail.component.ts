import { Component, OnInit } from '@angular/core';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-group-detail',
  templateUrl: './product-group-detail.component.html',
  styleUrls: ['./product-group-detail.component.css']
})
export class ProductGroupDetailComponent implements OnInit {
  currentProdGroup: ProductGroup;
  statusMessage: "";

  constructor(private route: ActivatedRoute ) { 
    this.currentProdGroup = new ProductGroup();
  }

  ngOnInit() {
    if(this.route.snapshot.queryParamMap.get('name')){
      this.currentProdGroup.productGroupName = this.route.snapshot.queryParamMap.get('name');
      this.currentProdGroup.productGroupCode = this.route.snapshot.queryParamMap.get('code');
      this.currentProdGroup.productGroupID = parseInt(this.route.snapshot.queryParamMap.get('id'));
      this.currentProdGroup.productGroupDescription = this.route.snapshot.queryParamMap.get('desc');
    }
    if(this.route.snapshot.queryParamMap.get('id')){
      //TODO IMPLEMENT SEARCH BY ID FROM PG SERVICE INTO API. 
    }

    console.log(this.currentProdGroup);
  }


}
