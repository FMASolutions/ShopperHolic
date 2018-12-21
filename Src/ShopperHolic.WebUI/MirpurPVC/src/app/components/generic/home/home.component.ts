import { Component, OnInit } from '@angular/core';
import { StatusMessageService } from 'src/app/services/status-message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  statusMessage: string = "";
  statusMessageClass: string = "";

  constructor(private sms: StatusMessageService, private route: ActivatedRoute) { }

  ngOnInit() {
    let statusFromQuery = this.route.snapshot.queryParamMap.get(this.sms.queryParamProperty);
      if(statusFromQuery){
        this.statusMessage = this.sms.getMessageFromQueryParam(statusFromQuery);
        this.statusMessageClass = this.sms.generateAlertClassFromQuery(statusFromQuery);
      }
  }

}
