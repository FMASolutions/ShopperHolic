import { Injectable } from '@angular/core';
import { StatusMessageService } from './status-message.service';
import { LoadingSpinnerService } from './loading-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  constructor(private sms: StatusMessageService, private spinner: LoadingSpinnerService) { }

  public informUserError(userMessage: string){
    this.sms.setDangerMessage(userMessage);
    this.spinner.closeAllSpinners();
  }

  public informUserStart(userMessage: string, spinnerMessage: string){
    this.sms.setInfoMessage(userMessage);
    this.spinner.openNewSpinner(spinnerMessage);
  }

  public informUserComplete(userMessage: string){
    this.sms.setSuccessMessage(userMessage);
    this.spinner.closeAllSpinners();
  }

  public informUserStartSpinnerOnly(spinnerMessage: string){
    this.spinner.openNewSpinner(spinnerMessage);
  }

  public closeSpinners(){
    this.spinner.closeAllSpinners();
  }
}
