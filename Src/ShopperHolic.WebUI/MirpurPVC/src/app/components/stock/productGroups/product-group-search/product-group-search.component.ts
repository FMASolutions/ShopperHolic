import { Component, OnInit } from '@angular/core';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { StatusMessage } from 'src/app/models/statusModel';

@Component({
  selector: 'app-product-group-search',
  templateUrl: './product-group-search.component.html',
  styleUrls: ['./product-group-search.component.css']
})
export class ProductGroupSearchComponent implements OnInit {

  searchID: number = 0;
  searchCode: string = "";
  statusMessage: StatusMessage = new StatusMessage();
  
  constructor(private prodService: ProductGroupService) { }

  ngOnInit() {
  }

  processSearch() {

    if (this.searchID) { // Search by ID
      this.prodService.getByID(this.searchID).subscribe(result => {
        this.statusMessage.setSuccessMessage("Search success");
        this.prodService.goToProductGroupDetail(result.productGroupID, this.statusMessage.getCurrentMessageAsUrlParameter());
      }, () => { //No search result
        this.statusMessage.setDangerMessage("No item found with ID: " + this.searchID);
      });
    } else if (this.searchCode) { //Search By Code
      return; // TODO Implement Search By Code
    } else { // user hasn't entered any search data... 
      this.statusMessage.setWarningMessage("ID or Code must be populated");
    }
  }

}
