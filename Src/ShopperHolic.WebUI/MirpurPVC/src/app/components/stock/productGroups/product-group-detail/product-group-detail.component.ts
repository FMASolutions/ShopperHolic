import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { StatusMessage } from 'src/app/models/statusModel';

//TODO LOCK DOWN HTML PART SO THE DELETE BUTTON DOESN'T SHOW DEPENDING ON THE CURRENT USER CLAIMS (IF ANY)
@Component({
  selector: 'app-product-group-detail',
  templateUrl: './product-group-detail.component.html',
  styleUrls: ['./product-group-detail.component.css']
})
export class ProductGroupDetailComponent implements OnInit {

  statusMessage: StatusMessage = new StatusMessage();
  detailForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private prodService: ProductGroupService) {
    this.detailForm = fb.group({
      id: 0,
      code: '',
      name: '',
      desc: ''
    });
  }

  ngOnInit() {
    this.populateFromNavBar();
  }

  requestUpdatePage() {
    this.prodService.goToProductGroupUpdate(this.detailForm.value["id"]); 
  }

  requestDelete() {

    if (confirm("Are you sure you would like to delete? This can't be undone....")) {

      this.statusMessage.setInfoMessage("Requesting Delete. Please wait");

      this.prodService.delete(this.detailForm.value["id"]).subscribe(deleteResp => {

        this.statusMessage.setSuccessMessage("Delete processed successfully");
        this.prodService.goToProductGroupHome(this.statusMessage.getCurrentMessageAsUrlParameter());
      
      }, error => {
        this.statusMessage.updateCurrentStatusFromError(error);
      });
    }

  }

  private populateFromNavBar() {
    let idFromNavBar: number = parseInt(this.route.snapshot.queryParamMap.get('id'));
    this.prodService.getByID(idFromNavBar).subscribe(respModel => {
      this.populateFormFromModel(respModel);
      this.statusMessage.updateCurrentStatusFromURL(this.route);
    })
  }

  private populateFormFromModel(model: ProductGroup) {
    this.detailForm.setValue({
      id: model.productGroupID,
      code: model.productGroupCode,
      name: model.productGroupName,
      desc: model.productGroupDescription
    });
  }
}
