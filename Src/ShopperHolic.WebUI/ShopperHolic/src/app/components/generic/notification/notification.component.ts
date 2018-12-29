import { Component, OnInit } from '@angular/core';
import { StatusMessageService } from 'src/app/services/generic/status-message.service';
import { UserActivityService } from 'src/app/services/generic/user-activity.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(public sms: StatusMessageService) { }

  ngOnInit() { }

  closeNotification() { this.sms.clearCurrentMessage(); }
}