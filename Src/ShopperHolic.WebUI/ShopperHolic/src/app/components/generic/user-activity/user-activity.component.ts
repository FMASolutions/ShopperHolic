import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { UserActivityService } from 'src/app/services/user-activity.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<UserActivityComponent>, private userActiveityService: UserActivityService) { }

  ngOnInit() { }

  clearAll() { this.userActiveityService.clearMessages(); }

  closeNotification(index: number) { this.userActiveityService.removeAtIndex(index); }

}
