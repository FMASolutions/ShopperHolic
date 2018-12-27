import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusMessageService } from 'src/app/services/status-message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sms: StatusMessageService) { 
    
  }

  ngOnInit() {
    this.sms.updateCurrentStatusFromURL(this.route);
  }

  closeNotification(){
    this.sms.currentMessage.clearCurrentMessage();
  }
}