export class StatusMessage {

    private value: string = "";
    private class: string = "";
    private icon: string = "";
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