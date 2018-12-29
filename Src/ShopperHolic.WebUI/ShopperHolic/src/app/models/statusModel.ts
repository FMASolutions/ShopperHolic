import { UserActivityService } from '../services/user-activity.service';

export class StatusMessage {
    constructor (private uas: UserActivityService) {}

    public value: string = "";
    public class: string = "";
    public icon: string = ""; 

    public clearCurrentMessage(){
        this.value = "";
        this.class = "";
        this.icon = "";
    }
}