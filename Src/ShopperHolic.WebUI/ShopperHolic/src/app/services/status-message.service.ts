import { Injectable } from '@angular/core';
import { StatusMessage } from '../models/statusModel';
import { UserActivityService } from './user-activity.service';

@Injectable({
  providedIn: 'root'
})
export class StatusMessageService {

  private currentMessage: StatusMessage = new StatusMessage(this.uas);

  constructor(private uas: UserActivityService) { }
  setSuccessMessage(message: string) {
    this.currentMessage.setSuccessMessage(message);
    this.setTimeout();
  }

  setInfoMessage(message: string) {
    this.currentMessage.setInfoMessage(message);
    this.setTimeout();
  }

  setWarningMessage(message: string) {
    this.currentMessage.setWarningMessage(message);
    this.setTimeout();
  }

  setDangerMessage(message: string) {
    this.currentMessage.setDangerMessage(message);
    this.setTimeout();
  }

  clearCurrentMessage() {
    this.currentMessage.clearCurrentMessage();
  }

  getValue() {
    return this.currentMessage.getValue();
  }

  getClass() {
    return this.currentMessage.getClass();
  }

  getIcon() {
    return this.currentMessage.getIcon();
  }

  private setTimeout() {
    this.runAlarm(10).then(value =>{
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

}
