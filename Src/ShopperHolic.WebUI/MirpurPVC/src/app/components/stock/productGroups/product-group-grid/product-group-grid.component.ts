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
  hasValues: boolean = true;

  constructor(private prodGroupService: ProductGroupService, private router: Router) {

  }

  ngOnInit() {
    this.refreshPreview();
  }

  refreshPreview() {
    this.statusMessage = "requesting data";
    this.prodGroupService.getAll().subscribe(allProdGroupResp => {
      if (this.prodGroupPreviews) { this.prodGroupPreviews = []; }

      allProdGroupResp.forEach(current => {
        if (this.prodGroupPreviews)
          this.prodGroupPreviews.push(current);
        else {
          this.prodGroupPreviews = []
          this.prodGroupPreviews.push(current);
        }
      });
      this.statusMessage = "";
    });
  }

  refreshAndApplyFilter() {
    
      this.prodGroupService.getAll().subscribe(prodResp => {
        if (this.prodGroupPreviews) { this.prodGroupPreviews = []; }

        prodResp.forEach(current => {
          if(this.codeFilterInput && this.nameFilterInput){
            if(current.productGroupCode.indexOf(this.codeFilterInput) >= 0 && current.productGroupName.indexOf(this.nameFilterInput) >= 0){
              this.prodGroupPreviews.push(current);
            }
          }
          else if(this.codeFilterInput){
            if(current.productGroupCode.indexOf(this.codeFilterInput) >= 0){
              this.prodGroupPreviews.push(current);
            }
          }
          else if(this.nameFilterInput){
            if(current.productGroupName.indexOf(this.nameFilterInput) >= 0){
              this.prodGroupPreviews.push(current);
            }
          }
          else{
            this.prodGroupPreviews.push(current);
          }
        })
      });
    
  }

  viewButtonClicked(id: number) {
    this.prodGroupService.goToDetailPage(id, this.router);
  }

}
