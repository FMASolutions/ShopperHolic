import { Component, OnInit } from '@angular/core';
import { ProductGroupService } from 'src/app/services/stock/productGroup/product-group.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductGroupComponent } from '../product-group/product-group.component';
import { StatusMessageService } from 'src/app/services/status-message.service';

@Component({
  selector: 'app-product-group-search',
  templateUrl: './product-group-search.component.html',
  styleUrls: ['./product-group-search.component.css']
})
export class ProductGroupSearchComponent implements OnInit {

  searchID: string = "";
  
  constructor(private sms: StatusMessageService, private prodService: ProductGroupService, private route: ActivatedRoute, public prodDialog: MatDialog) { 
    
  }

  ngOnInit() {
    
  }

  processSearch() {
    
    if (!isNaN(parseInt(this.searchID))) { // Search by ID
      this.prodService.getByID(parseInt(this.searchID)).subscribe(result => {
        let dialogRef = this.prodDialog.open(ProductGroupComponent,{
          minWidth : 370,
          maxWidth: 1100,
          width: "95%",
          data: result
        });
      }, () => { //No search result

      });
    } else { // user hasn't entered any search data... 

    }
  }

}
