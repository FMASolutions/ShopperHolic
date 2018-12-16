import { Component, OnInit } from '@angular/core';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';

@Component({
  selector: 'app-product-group-detail',
  templateUrl: './product-group-detail.component.html',
  styleUrls: ['./product-group-detail.component.css']
})
export class ProductGroupDetailComponent implements OnInit {

  currentProdGroup: ProductGroup;
  statusMessage: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private prodService: ProductGroupService) {
    this.currentProdGroup = new ProductGroup();
  }

  ngOnInit() {
    this.prodService.populateFromNavBarParameters(this.route.snapshot, this.currentProdGroup);
  }

  requestUpdatePage() {
    let navUrl = "/ProductGroupUpdate" + this.prodService.generateNavBarParameters(this.currentProdGroup);
    this.router.navigateByUrl(navUrl);
  }


}
