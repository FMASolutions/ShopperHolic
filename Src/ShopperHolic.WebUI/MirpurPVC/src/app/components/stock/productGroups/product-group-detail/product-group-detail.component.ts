import { Component, OnInit } from '@angular/core';
import { ProductGroup } from 'src/app/models/stock/productGroups/productGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGroupService } from 'src/app/services/stock/product-group.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StatusMessageService } from 'src/app/services/status-message.service';

@Component({
  selector: 'app-product-group-detail',
  templateUrl: './product-group-detail.component.html',
  styleUrls: ['./product-group-detail.component.css']
})
export class ProductGroupDetailComponent implements OnInit {

  statusMessage: string = "";
  statusMessageClass: string = "";
  detailForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private prodService: ProductGroupService,private sms: StatusMessageService) {
    this.detailForm = fb.group({
      id: 0,
      code: '',
      name: '',
      desc: ''
    });
  }

  ngOnInit() {
    let idFromNavBar: number = parseInt(this.route.snapshot.queryParamMap.get('id'));
    this.prodService.getByID(idFromNavBar).subscribe(resp =>{
      this.detailForm.setValue({
        id: resp.productGroupID,
        code: resp.productGroupCode,
        name: resp.productGroupName,
        desc: resp.productGroupDescription 
      });
      let statusFromQuery = this.route.snapshot.queryParamMap.get(this.sms.queryParamProperty);
      if(statusFromQuery){
        this.statusMessage = this.sms.getMessageFromQueryParam(statusFromQuery);
        this.statusMessageClass = this.sms.generateAlertClassFromQuery(statusFromQuery);
      }
    })
  }

  requestUpdatePage() {
    let navUrl = "/ProductGroupUpdate?id=" + this.detailForm.value["id"];
    this.router.navigateByUrl(navUrl);
  }

  requestDelete() {
    if (confirm("Are you sure you would like to delete? This can't be undone....")) {
      this.statusMessage = "Requesting Delete...";
      this.prodService.delete(this.detailForm.value["id"]).subscribe(deleteResp => {
        if (deleteResp) {
          this.router.navigateByUrl("/ProductGroups?" + this.sms.generateSuccessQueryParam("Delete processed successfully"));
        }
        else {this.statusMessage = "Delete Failed"; this.statusMessageClass = "alert alert-danger";}
      });
    }
  }


}
