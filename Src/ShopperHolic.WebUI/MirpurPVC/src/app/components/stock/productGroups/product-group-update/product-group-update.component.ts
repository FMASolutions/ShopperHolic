//TODO FIGURE OUT HOW TO COMBINE THE CREATE AND UPDATE HTML AS IT IS ESSENTIALLY THE SAME APART FROM ID
import { Component, OnInit } from '@angular/core';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { ActivatedRoute } from '@angular/router';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductGroupValidator } from 'src/app/services/stock/product-group-validator';
import { StatusMessage } from 'src/app/models/statusModel';

@Component({
  selector: 'app-product-group-update',
  templateUrl: './product-group-update.component.html',
  styleUrls: ['./product-group-update.component.css']
})
export class ProductGroupUpdateComponent implements OnInit {

  statusMessage: StatusMessage = new StatusMessage();
  updateForm: FormGroup;

  constructor(private route: ActivatedRoute, private prodService: ProductGroupService, private fb: FormBuilder, private pgValidator: ProductGroupValidator, ) {
    this.updateForm = fb.group({
      id: 0,
      code: ['', [pgValidator.validateCodeForCreate]],
      name: ['', [pgValidator.basicValidation]],
      desc: ['', [pgValidator.basicValidation]],
    });
  }

  ngOnInit() {
    let idFromNavBar: number = parseInt(this.route.snapshot.queryParamMap.get('id'));
    this.prodService.getByID(idFromNavBar).subscribe(resp => {
      this.updateForm.setValue({
        id: resp.productGroupID,
        code: resp.productGroupCode,
        name: resp.productGroupName,
        desc: resp.productGroupDescription
      });
    });
  }

  saveChanges() {
    this.statusMessage.setInfoMessage("Updating Please Wait...");

    let updatedGroup: ProductGroup = new ProductGroup();
    updatedGroup.productGroupID = this.updateForm.value["id"];
    updatedGroup.productGroupCode = this.updateForm.value["code"];
    updatedGroup.productGroupName = this.updateForm.value["name"];
    updatedGroup.productGroupDescription = this.updateForm.value["desc"];

    this.prodService.update(updatedGroup).subscribe(newModelResp => {
      this.statusMessage.setSuccessMessage("Update Success");
      this.prodService.goToProductGroupDetail(newModelResp.productGroupID, this.statusMessage.getCurrentMessageAsUrlParameter());
    });
  }

  goBack() {
    this.statusMessage.setInfoMessage("Changes Discarded");
    this.prodService.goToProductGroupDetail(this.updateForm.value["id"], this.statusMessage.getCurrentMessageAsUrlParameter());
  }
}
