import { Component, OnInit } from '@angular/core';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-group-grid',
  templateUrl: './product-group-grid.component.html',
  styleUrls: ['./product-group-grid.component.css']
})
export class ProductGroupGridComponent implements OnInit {

  prodGroupPreviews: ProductGroupPreview[] = [];
  codeFilterInput: string = "";
  nameFilterInput: string = "";
  statusMessage: string = "";

  constructor(private prodGroupService: ProductGroupService, private router: Router) {

  }

  ngOnInit() {
    this.refreshAndApplyFilter();
  }
  refreshAndApplyFilter() {
    this.statusMessage = "Requesting data";
    this.prodGroupService.getAll().subscribe(prodResp => {
      if (this.prodGroupPreviews) { this.prodGroupPreviews = []; }

      prodResp.forEach(current => {
        this.statusMessage = "Processing data";
        if (this.codeFilterInput && this.nameFilterInput) {
          if (current.productGroupCode.toLowerCase().indexOf(this.codeFilterInput.toLowerCase()) >= 0
            && current.productGroupName.toLowerCase().indexOf(this.nameFilterInput.toLowerCase()) >= 0) {
            this.prodGroupPreviews.push(current);
          }
        }
        else if (this.codeFilterInput) {
          if (current.productGroupCode.toLowerCase().indexOf(this.codeFilterInput.toLowerCase()) >= 0) {
            this.prodGroupPreviews.push(current);
          }
        }
        else if (this.nameFilterInput) {
          if (current.productGroupName.toLowerCase().indexOf(this.nameFilterInput.toLowerCase()) >= 0) {
            this.prodGroupPreviews.push(current);
          }
        }
        else {
          this.prodGroupPreviews.push(current);
        }
      })
      this.statusMessage = "Processing complete";
    });
  }

  viewButtonClicked(id: number) {
    this.prodGroupService.goToDetailPage(id, this.router);
  }

}
