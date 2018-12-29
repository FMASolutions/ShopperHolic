import { Component, OnInit } from '@angular/core';
import { UserActivityService } from 'src/app/services/user-activity.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {

  constructor(public userActiveityService: UserActivityService) { }

  ngOnInit() { }

  clearAll() { this.userActiveityService.clearMessages(); }

  closeNotification(index: number) { this.userActiveityService.removeAtIndex(index); }

}
