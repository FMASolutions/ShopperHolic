import { Injectable } from '@angular/core';
import { StatusMessage } from '../models/statusModel';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StatusMessageService {

  public queryParamProperty: string = "statusMessage";
  public currentMessage: StatusMessage = new StatusMessage();

  constructor() { }

  public generateSuccessQueryParam(message: string): string {
    return this.queryParamProperty + "=(S)" + message;
  }
  public generateInfoQueryParam(message: string): string {
    return this.queryParamProperty + "=(I)" + message;
  }
  public generateWarningQueryParam(message: string): string {
    return this.queryParamProperty + "=(W)" + message;
  }
  public generateDangerQueryParam(message: string): string {
    return this.queryParamProperty + "=(D)" + message;
  }

  public generateAlertClassFromQuery(queryParams: string): string {
    if (queryParams[1] == 'S') {
      return "alert alert-success";
    }
    else if (queryParams[1] == "I") {
      return "alert alert-info";
    }
    else if (queryParams[1] == "W") {
      return "alert alert-warning";
    }
    else if (queryParams[1] == "D") {
      return "alert alert-danger";
    }
    return "";
  }

  public setMessageFromUrlFormattedString(queryParams: string) {
    if (queryParams[1] == 'S') {
      this.currentMessage.setSuccessMessage(this.getMessageFromQueryParam(queryParams));
    }
    else if (queryParams[1] == "I") {
      this.currentMessage.setInfoMessage(this.getMessageFromQueryParam(queryParams));
    }
    else if (queryParams[1] == "W") {
      this.currentMessage.setWarningMessage(this.getMessageFromQueryParam(queryParams));
    }
    else if (queryParams[1] == "D") {
      this.currentMessage.setDangerMessage(this.getMessageFromQueryParam(queryParams));
    }
  }

  public generateClassParameterFromClasString(classText: string) {
    if (classText.indexOf('alert-success') > 0) { return "(S)"; }
    else if (classText.indexOf('alert-info') > 0) { return "(I)"; }
    else if (classText.indexOf('alert-warning') > 0) { return "(W)"; }
    else { return "(D)"; }
  }

  public getMessageFromQueryParam(queryParam: string): string {
    return queryParam.substr(3); //Skip out the 3 character encoding for the alert type i.e (S) (I) (W) (D)
  }

  public updateCurrentStatusFromURL(route: ActivatedRoute) {
    let statusFromQuery = route.snapshot.queryParamMap.get(this.queryParamProperty);
    if (statusFromQuery) {
      this.setMessageFromUrlFormattedString(statusFromQuery);
    }
  }

  getCurrentMessageAsUrlParameter(): string {
    let returnParameter = "statusMessage=";
    returnParameter += this.generateClassParameterFromClasString(this.currentMessage.getClass());
    returnParameter += this.currentMessage.getValue();
    return returnParameter;
  }
}
