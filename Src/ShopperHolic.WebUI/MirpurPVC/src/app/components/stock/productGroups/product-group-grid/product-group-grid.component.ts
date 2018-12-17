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
  
  prodGroupPreviews: ProductGroupPreview[];
  statusMessage: string = "";
  hasValues: boolean = true;

  constructor(private prodGroupService: ProductGroupService, private router: Router) { 
    
  }

  ngOnInit() {
    this.refreshPreview();
  }

  refreshPreview(){
    if(this.prodGroupPreviews)
      this.prodGroupPreviews = [];
    this.statusMessage = "requesting data";
    this.prodGroupService.getAll().subscribe(allProdGroupResp =>{
      allProdGroupResp.forEach(current =>{
        if(this.prodGroupPreviews)
          this.prodGroupPreviews.push(current);
        else
          {
            this.prodGroupPreviews = []
            this.prodGroupPreviews.push(current);
          }
      });
      this.statusMessage = "";
    });
  }

  viewButtonClicked(id: number)
  {
    this.prodGroupService.goToDetailPage(id, this.router);
  }

}
