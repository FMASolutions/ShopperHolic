import { Component, OnInit } from '@angular/core';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-group-search',
  templateUrl: './product-group-search.component.html',
  styleUrls: ['./product-group-search.component.css']
})
export class ProductGroupSearchComponent implements OnInit {

  searchID: number = 0;
  searchCode: string = "";
  statusMessage: string = "";

  constructor(private prodService: ProductGroupService, private router: Router) { }

  ngOnInit() {
  }

  processSearch() {
    if (!this.searchID && !this.searchCode) {
      this.statusMessage = "ID or Code must be populated"
      return;
    }
    if (this.searchID) {
      this.prodService.getByID(this.searchID).subscribe(result => {
        this.router.navigateByUrl('ProductGroupDetail' + this.prodService.generateNavBarParameters(result));
      });
    }
    else{ //TODO Implement Search By Code
      return;
    }
  }


}
