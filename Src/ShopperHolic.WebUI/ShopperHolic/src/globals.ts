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
                autoFocus: true,
                data: null
            },
            BASE_API_URL: "https://localhost:5001/api"
        }
    }

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

    public static get PROD_GROUP_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'View', 'Del']; }

}

export class CustomModalSettings {
    minWidth: number;
    maxWidth: number;
    width: string;
    autoFocus: boolean;
    data: any;
}
