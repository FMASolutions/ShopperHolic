//TODO FIGURE OUT HOW TO COMBINE THE CREATE AND UPDATE HTML AS IT IS ESSENTIALLY THE SAME APART FROM ID
import { Component, OnInit } from '@angular/core';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';

@Component({
  selector: 'app-product-group-update',
  templateUrl: './product-group-update.component.html',
  styleUrls: ['./product-group-update.component.css']
})
export class ProductGroupUpdateComponent implements OnInit {

  currentProdGroup: ProductGroup;
  statusMessage: "";

  constructor(private route: ActivatedRoute, private router: Router, private prodService: ProductGroupService) {
    this.currentProdGroup = new ProductGroup();
  }

  ngOnInit() {
    this.prodService.populateFromNavBarParameters(this.route.snapshot, this.currentProdGroup);
  }

  saveChanges() {
    //TODO IMPLEMENT UPDATE FEATURE>........
  }

}
