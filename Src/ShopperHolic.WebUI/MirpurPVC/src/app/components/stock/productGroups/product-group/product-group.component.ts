import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusMessage } from 'src/app/models/statusModel';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

  statusMessage: StatusMessage = new StatusMessage();

  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.statusMessage.updateCurrentStatusFromURL(this.route);
  }

}