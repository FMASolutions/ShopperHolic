import { UserActivityService } from '../services/user-activity.service';

export class StatusMessage {
    constructor (private uas: UserActivityService) {}

    private value: string = "";
    private class: string = "";
    private icon: string = ""; //TODO Get icons setup.

    public getValue() : string{
        return this.value;
    }
    public getClass() : string{
        return this.class;
    }
    public getIcon() : string{
        return this.icon;
    }

    public updateCurrentStatusFromError(error){
        this.value = error.error;
        this.class = "alert alert-danger";
        this.icon = "error";
        this.addTooUserActivity();
    }

    private addTooUserActivity(){
        let newUserActivity: StatusMessage = new StatusMessage(this.uas);
        Object.assign(newUserActivity, this);
        console.log("adding message");
        console.log(newUserActivity);
        this.uas.addMessage(newUserActivity);
    }

    public setInfoMessage(message: string){
        this.value = message;
        this.class = "alert alert-info";
        this.icon = "info";
        this.addTooUserActivity();
    }

    public setWarningMessage(message: string){
        this.value = message;
        this.class = "alert alert-warning";
        this.icon = "warning";
        this.addTooUserActivity();
    }

    public setSuccessMessage(message: string){
        this.value = message;
        this.class = "alert alert-success";
        this.icon= "check_circle";
        this.addTooUserActivity();
    }

    public setDangerMessage(message: string){
        this.value = message;
        this.class = "alert alert-danger";
        this.icon = "error";
        this.addTooUserActivity();
    }
    public clearCurrentMessage(){
        this.value = "";
        this.class = "";
    }
}