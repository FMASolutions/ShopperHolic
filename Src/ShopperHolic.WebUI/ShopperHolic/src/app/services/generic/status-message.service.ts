import { Injectable } from '@angular/core';
import { StatusMessage } from '../../models/statusModel';
import { UserActivityService } from './user-activity.service';

@Injectable({
  providedIn: 'root'
})
export class StatusMessageService {

  private currentMessage: StatusMessage = new StatusMessage(this.uas);

  constructor(private uas: UserActivityService) { }

  clearCurrentMessage() { this.currentMessage.clearCurrentMessage(); }

  getValue() { return this.currentMessage.value; }

  getClass() { return this.currentMessage.class; }

  getIcon() { return this.currentMessage.icon; }

  setSuccessMessage(message: string) {
    if(message){
    this.currentMessage.value = message;
    this.currentMessage.class = "alert alert-success";
    this.currentMessage.icon = "check_circle";
    this.addToUserActivity();
    this.setTimeout();
    }
  }

  setInfoMessage(message: string) {
    if(message){
    this.currentMessage.value = message;
    this.currentMessage.class = "alert alert-info";
    this.currentMessage.icon = "info";
    this.addToUserActivity();
    this.setTimeout();
    }
  }

  setWarningMessage(message: string) {
    if(message){
    this.currentMessage.value = message;
    this.currentMessage.class = "alert alert-warning";
    this.currentMessage.icon = "warning";
    this.addToUserActivity();
    this.setTimeout();
    }
  }

  setDangerMessage(message: string) {
    if (message) {
      this.currentMessage.value = message;
      this.currentMessage.class = "alert alert-danger";
      this.currentMessage.icon = "error";
      this.addToUserActivity();
      this.setTimeout();
    }
  }

  private setTimeout() {
    this.runAlarm(10).then(value => {
      this.clearCurrentMessage();
    })
  }

  private runAlarm(interval: number) {
    interval = interval * 1000;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(interval);
      }, interval);
    });
  }

  private addToUserActivity() {
    let newUserActivity: StatusMessage = new StatusMessage(this.uas);
    Object.assign(newUserActivity, this.currentMessage);
    this.uas.addMessage(newUserActivity);
  }
}