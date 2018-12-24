import { ActivatedRoute } from '@angular/router';
import { StatusMessageService } from '../services/status-message.service';

export class StatusMessage {

    private value: string = "";
    private class: string = "";
    sms: StatusMessageService = new StatusMessageService();

    public updateCurrentStatusFromURL(route: ActivatedRoute) {
        let statusFromQuery = route.snapshot.queryParamMap.get(this.sms.queryParamProperty);
        if (statusFromQuery) {
            this.value = this.sms.getMessageFromQueryParam(statusFromQuery);
            this.class = this.sms.generateAlertClassFromQuery(statusFromQuery);
        }
    }

    public getValue() : string{
        return this.value;
    }
    public getClass() : string{
        return this.class;
    }

    getCurrentMessageAsUrlParameter() : string{
        let returnParameter = "statusMessage=";
        returnParameter += this.sms.generateClassParameterFromClasString(this.class);
        returnParameter += this.value;
        return returnParameter;
    }

    public updateCurrentStatusFromError(error){
        this.value = error.error;
        this.class = "alert alert-danger";
    }

    public setInfoMessage(message: string){
        this.value = message;
        this.class = "alert alert-info";
    }

    public setWarningMessage(message: string){
        this.value = message;
        this.class = "alert alert-warning";
    }

    public setSuccessMessage(message: string){
        this.value = message;
        this.class = "alert alert-success";
    }

    public setDangerMessage(message: string){
        this.value = message;
        this.class = "alert alert-danger";
    }
    public clearCurrentMessage(){
        this.value = "";
        this.class = "";
    }
}