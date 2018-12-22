import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusMessageService {

  public queryParamProperty: string = "statusMessage";

  constructor() { }

  public generateSuccessQueryParam(message: string): string {
    return this.queryParamProperty + "=(S)" + message;
  }
  public generateInfoQueryParam(message: string): string{
    return this.queryParamProperty + "=(I)" + message;
  }
  public generateWarningQueryParam(message: string): string{
    return this.queryParamProperty + "=(W)" + message;
  }
  public generateDangerQueryParam(message: string): string{
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

  public getMessageFromQueryParam(queryParam: string): string{
    return queryParam.substr(3); //Skip out the 3 character encoding for the alert type i.e (S) (I) (W) (D)
  }
}
