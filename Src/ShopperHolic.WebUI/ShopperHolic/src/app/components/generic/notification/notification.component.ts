import { Component, OnInit } from '@angular/core';
import { StatusMessageService } from 'src/app/services/status-message.service';
import { UserActivityService } from 'src/app/services/user-activity.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private sms: StatusMessageService, private uas: UserActivityService) { }

  ngOnInit() { }

  closeNotification() { this.sms.clearCurrentMessage(); }
}