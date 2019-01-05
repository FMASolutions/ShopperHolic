export class AppSettings {
    APP_TITLE: string;
    APP_TITLE_SHORT: string;
    DEFAULT_MODAL_SETTINGS: CustomModalSettings;
    BASE_API_URL: string;
}

export class Globals {
    public static get APP_SETTINGS(): AppSettings {
        let original = {
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
        let copy = new AppSettings();
        Object.assign(copy, original);
        return copy;
    }
    //Generic Text
    public static get UPDATE_BUTTON_TEXT(): string { return "Update"; }
    public static get CREATE_BUTTON_TEXT(): string { return "Create New" }
    public static get SPINNER_LOGIN_MSG(): string { return "Requesting Login..." }
    public static get SPINNER_UPDATE_MESSAGE(): string { return "Requesting Update.." }
    public static get SPINNER_CREATE_MESSAGE(): string { return "Requesting Create.." }
    public static get SPINNER_DELETE_MESSAGE(): string { return "Requesting Delete.." }
    public static get SPINNER_SORT_MESSAGE(): string { return "Sorting Data.." }
    public static get SPINNER_FILTER_MESSAGE(): string { return "Applying Filter.." }
    public static get SPINNER_GET_MESSAGE(): string { return "Fetching Data.." }
    public static get SPINNER_UPLOAD_MESSAGE(): string {return "Performing image upload"}
    public static get LOGIN_FAILED_MSG(): string { return "Login failed for user: "; }
    public static get LOGIN_SUCCESS_MSG(): string { return "Login success for user: "; }
    public static get LOGIN_ATTEMPT_MSG(): string { return "Attempting login for user: "; }
    public static get MODE_UPDATE(): string { return "Update"; }
    public static get MODE_CREATE(): string { return "Create"; }
    

    //Product Group Specific Text
    public static get PROD_GROUP_UPDATE_TITLE(): string { return "Product Group Update"; }
    public static get PROD_GROUP_CREATE_TITLE(): string { return "Create New Product Group"; }
    public static get PROD_GROUP_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new product group: "; }
    public static get PROD_GROUP_CREATE_SUCCESS_MSG(): string { return "Successfully created product group: "; }
    public static get PROD_GROUP_CREATE_FAILED_MSG(): string { return "Failed to create product group: "; }
    public static get PROD_GROUP_READ_FAILED_MSG(): string { return "Failed to retrieve product group data: "; }
    public static get PROD_GROUP_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update product group: "; }
    public static get PROD_GROUP_UPDATE_SUCCESS_MSG(): string { return "Successfully updated product group: "; }
    public static get PROD_GROUP_UPDATE_FAILED_MSG(): string { return "Failed to update product group: "; }
    public static get PROD_GROUP_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete product group: "; }
    public static get PROD_GROUP_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete product group: "; }
    public static get PROD_GROUP_DELETE_SUCCESS_MSG(): string { return "Successfully deleted product group: "; }
    public static get PROD_GROUP_DELETE_FAILED_MSG(): string { return "Failed to delete product group: "; }
    public static get PROD_GROUP_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'View', 'Del']; }
    public static get PROD_GROUP_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'Select']; }

    //Sub Group Specific Text
    public static get SUB_GROUP_UPDATE_TITLE(): string { return "Sub Group Update"; }
    public static get SUB_GROUP_CREATE_TITLE(): string { return "Create New Sub Group"; }
    public static get SUB_GROUP_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new sub group: "; }
    public static get SUB_GROUP_CREATE_SUCCESS_MSG(): string { return "Successfully created sub group: "; }
    public static get SUB_GROUP_CREATE_FAILED_MSG(): string { return "Failed to create sub group: "; }
    public static get SUB_GROUP_READ_FAILED_MSG(): string { return "Failed to retrieve sub group data: "; }
    public static get SUB_GROUP_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update sub group: "; }
    public static get SUB_GROUP_UPDATE_SUCCESS_MSG(): string { return "Successfully updated sub group: "; }
    public static get SUB_GROUP_UPDATE_FAILED_MSG(): string { return "Failed to update sub group: "; }
    public static get SUB_GROUP_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete sub group: "; }
    public static get SUB_GROUP_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete sub group: "; }
    public static get SUB_GROUP_DELETE_SUCCESS_MSG(): string { return "Successfully deleted sub group: "; }
    public static get SUB_GROUP_DELETE_FAILED_MSG(): string { return "Failed to delete sub group: "; }
    public static get SUB_GROUP_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name','PID', 'View', 'Del']; }
    public static get SUB_GROUP_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name','PID', 'Select']; }

    //Item Specific Text
    public static get ITEM_UPDATE_TITLE(): string { return "Item Update"; }
    public static get ITEM_CREATE_TITLE(): string { return "Create New Item"; }
    public static get ITEM_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new item: "; }
    public static get ITEM_CREATE_SUCCESS_MSG(): string { return "Successfully created item: "; }
    public static get ITEM_CREATE_FAILED_MSG(): string { return "Failed to create item: "; }
    public static get ITEM_READ_FAILED_MSG(): string { return "Failed to retrieve item data: "; }
    public static get ITEM_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update item: "; }
    public static get ITEM_UPDATE_SUCCESS_MSG(): string { return "Successfully updated item: "; }
    public static get ITEM_UPDATE_FAILED_MSG(): string { return "Failed to update item: "; }
    public static get ITEM_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete item: "; }
    public static get ITEM_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete item: "; }
    public static get ITEM_DELETE_SUCCESS_MSG(): string { return "Successfully deleted item: "; }
    public static get ITEM_DELETE_FAILED_MSG(): string { return "Failed to delete item: "; }
    public static get ITEM_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name','SID', 'View', 'Del']; }
    public static get ITEM_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name','SID', 'Select']; }

    //Country Specific Text
    public static get COUNTRY_UPDATE_TITLE(): string { return "Country Update"; }
    public static get COUNTRY_CREATE_TITLE(): string { return "Create New Country"; }
    public static get COUNTRY_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new country: "; }
    public static get COUNTRY_CREATE_SUCCESS_MSG(): string { return "Successfully created country: "; }
    public static get COUNTRY_CREATE_FAILED_MSG(): string { return "Failed to create country: "; }
    public static get COUNTRY_READ_FAILED_MSG(): string { return "Failed to retrieve country data: "; }
    public static get COUNTRY_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update country: "; }
    public static get COUNTRY_UPDATE_SUCCESS_MSG(): string { return "Successfully updated country: "; }
    public static get COUNTRY_UPDATE_FAILED_MSG(): string { return "Failed to update country: "; }
    public static get COUNTRY_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete country: "; }
    public static get COUNTRY_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete country: "; }
    public static get COUNTRY_DELETE_SUCCESS_MSG(): string { return "Successfully deleted country: "; }
    public static get COUNTRY_DELETE_FAILED_MSG(): string { return "Failed to delete country: "; }
    public static get COUNTRY_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'View', 'Del']; }
    public static get COUNTRY_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'Select']; }

    //City Specific Text
    public static get CITY_UPDATE_TITLE(): string { return "City Update"; }
    public static get CITY_CREATE_TITLE(): string { return "Create New City"; }
    public static get CITY_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new city: "; }
    public static get CITY_CREATE_SUCCESS_MSG(): string { return "Successfully created city: "; }
    public static get CITY_CREATE_FAILED_MSG(): string { return "Failed to create city: "; }
    public static get CITY_READ_FAILED_MSG(): string { return "Failed to retrieve city data: "; }
    public static get CITY_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update city: "; }
    public static get CITY_UPDATE_SUCCESS_MSG(): string { return "Successfully updated city: "; }
    public static get CITY_UPDATE_FAILED_MSG(): string { return "Failed to update city: "; }
    public static get CITY_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete city: "; }
    public static get CITY_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete city: "; }
    public static get CITY_DELETE_SUCCESS_MSG(): string { return "Successfully deleted city: "; }
    public static get CITY_DELETE_FAILED_MSG(): string { return "Failed to delete city: "; }
    public static get CITY_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name','SID', 'View', 'Del']; }
    public static get CITY_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name','SID', 'Select']; }

    //CityArea Specific Text
    public static get CITYAREA_UPDATE_TITLE(): string { return "City Area Update"; }
    public static get CITYAREA_CREATE_TITLE(): string { return "Create New City Area"; }
    public static get CITYAREA_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new city area: "; }
    public static get CITYAREA_CREATE_SUCCESS_MSG(): string { return "Successfully created city area: "; }
    public static get CITYAREA_CREATE_FAILED_MSG(): string { return "Failed to create city area: "; }
    public static get CITYAREA_READ_FAILED_MSG(): string { return "Failed to retrieve city area data: "; }
    public static get CITYAREA_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update city area: "; }
    public static get CITYAREA_UPDATE_SUCCESS_MSG(): string { return "Successfully updated city area: "; }
    public static get CITYAREA_UPDATE_FAILED_MSG(): string { return "Failed to update city area: "; }
    public static get CITYAREA_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete city area: "; }
    public static get CITYAREA_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete city area: "; }
    public static get CITYAREA_DELETE_SUCCESS_MSG(): string { return "Successfully deleted city area: "; }
    public static get CITYAREA_DELETE_FAILED_MSG(): string { return "Failed to delete city area: "; }
    public static get CITYAREA_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name','SID', 'View', 'Del']; }
    public static get CITYAREA_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name','SID', 'Select']; }

    //Address Specific Text
    public static get ADDRESS_UPDATE_TITLE(): string { return "Address Update"; }
    public static get ADDRESS_CREATE_TITLE(): string { return "Create New Address"; }
    public static get ADDRESS_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new address: "; }
    public static get ADDRESS_CREATE_SUCCESS_MSG(): string { return "Successfully created address: "; }
    public static get ADDRESS_CREATE_FAILED_MSG(): string { return "Failed to create address: "; }
    public static get ADDRESS_READ_FAILED_MSG(): string { return "Failed to retrieve address data: "; }
    public static get ADDRESS_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update address: "; }
    public static get ADDRESS_UPDATE_SUCCESS_MSG(): string { return "Successfully updated address: "; }
    public static get ADDRESS_UPDATE_FAILED_MSG(): string { return "Failed to update address: "; }
    public static get ADDRESS_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete address: "; }
    public static get ADDRESS_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete address: "; }
    public static get ADDRESS_DELETE_SUCCESS_MSG(): string { return "Successfully deleted address: "; }
    public static get ADDRESS_DELETE_FAILED_MSG(): string { return "Failed to delete address: "; }
    public static get ADDRESS_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name','SID', 'View', 'Del']; }
    public static get ADDRESS_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name','SID', 'Select']; }

}

export class CustomModalSettings {
    minWidth: number;
    maxWidth: number;
    width: string;
    disableClose: boolean;
    autoFocus: boolean;
    data: any;
}
