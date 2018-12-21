//TODO FIGURE OUT HOW TO COMBINE THE CREATE AND UPDATE HTML AS IT IS ESSENTIALLY THE SAME APART FROM ID
import { Component, OnInit } from '@angular/core';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fbind } from 'q';
import { ProductGroupValidator } from 'src/app/services/stock/product-group-validator';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { StatusMessageService } from 'src/app/services/status-message.service';

@Component({
  selector: 'app-product-group-update',
  templateUrl: './product-group-update.component.html',
  styleUrls: ['./product-group-update.component.css']
})
export class ProductGroupUpdateComponent implements OnInit {

  statusMessage: string = "";
  statusMessageClass: string = "";
  updateForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodService: ProductGroupService,
    private fb: FormBuilder,
    private pgValidator: ProductGroupValidator,
    private sms: StatusMessageService
  ) {
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
      console.log(resp);
      this.updateForm.setValue({
        id: resp.productGroupID,
        code: resp.productGroupCode,
        name: resp.productGroupName,
        desc: resp.productGroupDescription
      });
    });
  }

  saveChanges() {
    let updatedGroup: ProductGroup = new ProductGroup();
    updatedGroup.productGroupID = this.updateForm.value["id"];
    updatedGroup.productGroupCode = this.updateForm.value["code"];
    updatedGroup.productGroupName = this.updateForm.value["name"];
    updatedGroup.productGroupDescription = this.updateForm.value["desc"];

    this.prodService.update(updatedGroup).subscribe(newModelResp => {
      this.router.navigateByUrl("ProductGroupDetail?id=" + newModelResp.productGroupID + "&" + this.sms.generateSuccessQueryParam("Update Success"));
    });
    this.statusMessage = "Updating Please Wait.....";
    this.statusMessageClass = "alert alert-info";
  }

  goBack() {
    this.router.navigateByUrl('/ProductGroupDetail?id=' + this.updateForm.value["id"] + "&" + this.sms.generateInfoQueryParam("Changes Discarded"));
  }
}
