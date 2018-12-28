export class Globals{
    public static APP_SETTINGS: AppSettings = {
            appTitle: "Mirpur PVC",
            appTitleShort: "M-PVC",
            defaultModalSettings: {
                minWidth : 200,
                maxWidth: 1100,
                width: "90%",
                autoFocus: true,
                data: null
            },
            baseAPIUrl: "https://localhost:5001/api"
    }

    public static LOGIN_FAILED_MESSAGE: string = "Login failed! Please check your credentials and try again.";
    public static LOGIN_SUCCESS_MESSAGE: string = "Login success!";
}

export class AppSettings{
    appTitle: string;
    appTitleShort: string;
    defaultModalSettings: ModalSettings;
    baseAPIUrl: string;
}


export class ModalSettings{
    minWidth : number;
    maxWidth: number;
    width: string;
    autoFocus: boolean;
    data: any;
}