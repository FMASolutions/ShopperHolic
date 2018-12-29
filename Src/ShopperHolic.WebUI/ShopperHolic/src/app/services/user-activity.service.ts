import { Injectable } from '@angular/core';
import { StatusMessage } from '../models/statusModel';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  public activityMessages: StatusMessage[] = [];

  constructor() { }

  clearMessages(): void {
    this.activityMessages = [];
  }

  getMostRecentMessage(): StatusMessage {
    if (this.activityMessages.length > 0) {
      return this.activityMessages[0];
    } else {
      return null;
    }
  }

  removeAtIndex(index: number): void {
    if (this.activityMessages.length > 0)
      this.activityMessages.splice(index, 1);
  }

  addMessage(newMessage: StatusMessage): void {
    if (this.activityMessages.length > 0)
      this.activityMessages.unshift(newMessage);
    else
      this.activityMessages.push(newMessage);
  }

  removeMostRecent(): void {
    if (this.activityMessages) {
      this.activityMessages.splice(0, 1);
    }
  }

  removeWithText(message: string): void {
    this.removeAtIndex(this.activityMessages.findIndex(current => current.value == message));
  }
}
