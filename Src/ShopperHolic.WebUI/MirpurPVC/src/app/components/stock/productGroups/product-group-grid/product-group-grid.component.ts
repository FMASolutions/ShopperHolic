import { Component, OnInit } from '@angular/core';
import { ProductGroupPreview } from 'src/app/models/stock/productGroups/productGroupPreview';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { StatusMessage } from 'src/app/models/statusModel';

@Component({
  selector: 'app-product-group-grid',
  templateUrl: './product-group-grid.component.html',
  styleUrls: ['./product-group-grid.component.css']
})
export class ProductGroupGridComponent implements OnInit {

  prodGroupPreviews: ProductGroupPreview[] = [];
  codeFilterInput: string = "";
  nameFilterInput: string = "";
  statusMessage: StatusMessage = new StatusMessage();

  constructor(private prodGroupService: ProductGroupService) { }

  ngOnInit() { this.refreshAndApplyFilter(); }

  viewButtonClicked(id: number) {
    this.prodGroupService.goToProductGroupDetail(id);
  }

  refreshAndApplyFilter() {
    this.prodGroupService.getAll().subscribe(prodResp => {

      if (this.prodGroupPreviews) { this.prodGroupPreviews = []; }

      prodResp.forEach(current => {
        this.applyFilter(current);
      })

      if (this.prodGroupPreviews.length == 0) {
        this.statusMessage.setDangerMessage("No data found!");
      } else {
        this.statusMessage.clearCurrentMessage();
      }
    });
  }

  resetFilters() {
    this.codeFilterInput = "";
    this.nameFilterInput = "";
    this.refreshAndApplyFilter();
  }

  private applyFilter(item: ProductGroupPreview) {
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
}
