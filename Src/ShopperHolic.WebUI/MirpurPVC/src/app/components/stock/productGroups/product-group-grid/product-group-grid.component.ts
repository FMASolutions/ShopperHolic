import { Component, OnInit } from '@angular/core';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { Router } from '@angular/router';
import { StatusMessageService } from 'src/app/services/status-message.service';

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
  statusMessageClass: string = "";

  constructor(private prodGroupService: ProductGroupService, private router: Router,private sms: StatusMessageService) {

  }

  ngOnInit() {
    this.refreshAndApplyFilter();
  }

  refreshAndApplyFilter() {
    this.prodGroupService.getAll().subscribe(prodResp => {
      if (this.prodGroupPreviews) { this.prodGroupPreviews = []; }
      prodResp.forEach(current => {
        this.applyFilter(current);
      })
      if(this.prodGroupPreviews.length == 0){
        this.statusMessage = "No data found!";
        this.statusMessageClass = "alert alert-danger"
      }
      else{
        this.statusMessage="";
        this.statusMessageClass="";
      }
    });
  }

  resetFilters(){
    this.codeFilterInput = "";
    this.nameFilterInput = "";
    this.refreshAndApplyFilter();
  }

  private applyFilter(item: ProductGroupPreview){
    if (this.codeFilterInput && this.nameFilterInput) { //Both filters contain values
      if (item.productGroupCode.toLowerCase().indexOf(this.codeFilterInput.toLowerCase()) >= 0
        && item.productGroupName.toLowerCase().indexOf(this.nameFilterInput.toLowerCase()) >= 0) {
        this.prodGroupPreviews.push(item);
      }
    }
    else if (this.codeFilterInput) { //Only apply code filter
      if (item.productGroupCode.toLowerCase().indexOf(this.codeFilterInput.toLowerCase()) >= 0) {
        this.prodGroupPreviews.push(item);
      }
    }
    else if (this.nameFilterInput) { //Only apply name filter
      if (item.productGroupName.toLowerCase().indexOf(this.nameFilterInput.toLowerCase()) >= 0) {
        this.prodGroupPreviews.push(item);
      }
    }
    else { //No filters present so always add the item.
      this.prodGroupPreviews.push(item);
    }
  }

  viewButtonClicked(id: number) {
    this.router.navigateByUrl('/ProductGroupDetail?id=' + id.toString());
  }

}
