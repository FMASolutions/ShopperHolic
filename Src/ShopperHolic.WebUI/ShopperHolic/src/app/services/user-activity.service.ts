import { Injectable } from '@angular/core';
import { StatusMessage } from '../models/statusModel';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  public activityMessages: StatusMessage[] = [];

  constructor() { }

  clearMessages(): void { this.activityMessages = []; }

  removeAtIndex(index: number): void { if (this.activityMessages.length > 0) { this.activityMessages.splice(index, 1); } }

  addMessage(newMessage: StatusMessage): void {
    this.activityMessages.length ? this.activityMessages.unshift(newMessage) : this.activityMessages.push(newMessage);
  }
}
