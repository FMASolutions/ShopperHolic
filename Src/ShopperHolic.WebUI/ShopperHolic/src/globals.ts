export class AppSettings {
    APP_TITLE: string;
    APP_TITLE_SHORT: string;
    DEFAULT_MODAL_SETTINGS: CustomModalSettings;
    BASE_API_URL: string;
}

export class Globals {
    public static get APP_SETTINGS(): AppSettings {
        return {
            APP_TITLE: "Mirpur PVC",
            APP_TITLE_SHORT: "M-PVC",
            DEFAULT_MODAL_SETTINGS: {
                minWidth: 200,
                maxWidth: 1100,
                width: "90%",
                disableClose: false,
                autoFocus: true,
                data: null
            },
            BASE_API_URL: "https://localhost:5001/api"
        }
    }

    public static get SPINNER_LOGIN_MSG(): string { return "Requesting Login..." }
    public static get SPINNER_UPDATE_MESSAGE(): string { return "Requesting Update.." }
    public static get SPINNER_CREATE_MESSAGE(): string { return "Requesting Create.." }
    public static get SPINNER_DELETE_MESSAGE(): string { return "Requesting Delete.." }
    public static get SPINNER_SORT_MESSAGE(): string { return "Sorting Data.." }
    public static get SPINNER_FILTER_MESSAGE(): string { return "Applying Filter.." }
    public static get SPINNER_GET_MESSAGE(): string { return "Fetching Data.." }

    public static get LOGIN_FAILED_MSG(): string { return "Login failed for user: "; }
    public static get LOGIN_SUCCESS_MSG(): string { return "Login success for user: "; }
    public static get LOGIN_ATTEMPT_MSG(): string { return "Attempting login for user: "; }

    public static get PROD_GROUP_UPDATE_TITLE(): string { return "Product Group Update"; }
    public static get PROD_GROUP_CREATE_TITLE(): string { return "Create New Product Group"; }

    public static get PROD_GROUP_UPDATE_MODE(): string { return "Update"; }
    public static get PROD_GROUP_CREATE_MODE(): string { return "Create"; }

    public static get PROD_GROUP_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new product group: "; }
    public static get PROD_GROUP_CREATE_SUCCESS_MSG(): string { return "Successfully created product group: "; }
    public static get PROD_GROUP_CREATE_FAILED_MSG(): string { return "Failed to create product group: "; }

    public static get PROD_GROUP_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update product group: "; }
    public static get PROD_GROUP_UPDATE_SUCCESS_MSG(): string { return "Successfully updated product group: "; }
    public static get PROD_GROUP_UPDATE_FAILED_MSG(): string { return "Failed to update product group: "; }

    public static get PROD_GROUP_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete product group: "; }
    public static get PROD_GROUP_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete product group: "; }
    public static get PROD_GROUP_DELETE_SUCCESS_MSG(): string { return "Successfully deleted product group: "; }
    public static get PROD_GROUP_DELETE_FAILED_MSG(): string { return "Failed to delete product group: "; }

    public static get PROD_GROUP_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'View', 'Del']; }


    public static get SUB_GROUP_UPDATE_TITLE(): string { return "Sub Group Update"; }
    public static get SUB_GROUP_CREATE_TITLE(): string { return "Create New Sub Group"; }

    public static get SUB_GROUP_UPDATE_MODE(): string { return "Update"; }
    public static get SUB_GROUP_CREATE_MODE(): string { return "Create"; }

    public static get SUB_GROUP_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new sub group: "; }
    public static get SUB_GROUP_CREATE_SUCCESS_MSG(): string { return "Successfully created sub group: "; }
    public static get SUB_GROUP_CREATE_FAILED_MSG(): string { return "Failed to create sub group: "; }

    public static get SUB_GROUP_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update sub group: "; }
    public static get SUB_GROUP_UPDATE_SUCCESS_MSG(): string { return "Successfully updated sub group: "; }
    public static get SUB_GROUP_UPDATE_FAILED_MSG(): string { return "Failed to update sub group: "; }

    public static get SUB_GROUP_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete sub group: "; }
    public static get SUB_GROUP_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete sub group: "; }
    public static get SUB_GROUP_DELETE_SUCCESS_MSG(): string { return "Successfully deleted sub group: "; }
    public static get SUB_GROUP_DELETE_FAILED_MSG(): string { return "Failed to delete sub group: "; }

    public static get SUB_GROUP_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'View', 'Del']; }

}

export class CustomModalSettings {
    minWidth: number;
    maxWidth: number;
    width: string;
    disableClose: boolean;
    autoFocus: boolean;
    data: any;
}
