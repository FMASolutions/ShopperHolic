import { environment } from './environments/environment';

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
            BASE_API_URL: environment.base_api_url
        }
        let copy = new AppSettings();
        Object.assign(copy, original);
        return copy;
    }
    //Generic Text
    public static get UPDATE_BUTTON_TEXT(): string { return "Update"; }
    public static get CREATE_BUTTON_TEXT(): string { return "Create New" }
    public static get ADD_BUTTON_TEXT(): string { return "Add" }
    public static get SPINNER_LOGIN_MSG(): string { return "Requesting Login..." }
    public static get SPINNER_UPDATE_MESSAGE(): string { return "Requesting Update.." }
    public static get SPINNER_CREATE_MESSAGE(): string { return "Requesting Create.." }
    public static get SPINNER_DELETE_MESSAGE(): string { return "Requesting Delete.." }
    public static get SPINNER_SORT_MESSAGE(): string { return "Sorting Data.." }
    public static get SPINNER_FILTER_MESSAGE(): string { return "Applying Filter.." }
    public static get SPINNER_GET_MESSAGE(): string { return "Fetching Data.." }
    public static get SPINNER_UPLOAD_MESSAGE(): string { return "Performing image upload" }
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
    public static get SUB_GROUP_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'PID', 'View', 'Del']; }
    public static get SUB_GROUP_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'PID', 'Select']; }

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
    public static get ITEM_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'SID', 'View', 'Del']; }
    public static get ITEM_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'SID', 'Select']; }

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
    public static get CITY_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'CID', 'View', 'Del']; }
    public static get CITY_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'CID', 'Select']; }

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
    public static get CITYAREA_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'CID', 'View', 'Del']; }
    public static get CITYAREA_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'CID', 'Select']; }

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
    public static get ADDRESS_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Line1', 'Line2', 'CityAreaName', 'View', 'Del']; }
    public static get ADDRESS_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Line1', 'Line2', 'CityAreaName', 'Select']; }

    //Supplier Specific Text
    public static get SUPPLIER_UPDATE_TITLE(): string { return "Supplier Update"; }
    public static get SUPPLIER_CREATE_TITLE(): string { return "Create New Supplier"; }
    public static get SUPPLIER_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new supplier: "; }
    public static get SUPPLIER_CREATE_SUCCESS_MSG(): string { return "Successfully created supplier: "; }
    public static get SUPPLIER_CREATE_FAILED_MSG(): string { return "Failed to create supplier: "; }
    public static get SUPPLIER_READ_FAILED_MSG(): string { return "Failed to retrieve supplier data: "; }
    public static get SUPPLIER_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update supplier: "; }
    public static get SUPPLIER_UPDATE_SUCCESS_MSG(): string { return "Successfully updated supplier: "; }
    public static get SUPPLIER_UPDATE_FAILED_MSG(): string { return "Failed to update supplier: "; }
    public static get SUPPLIER_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete supplier: "; }
    public static get SUPPLIER_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete supplier: "; }
    public static get SUPPLIER_DELETE_SUCCESS_MSG(): string { return "Successfully deleted supplier: "; }
    public static get SUPPLIER_DELETE_FAILED_MSG(): string { return "Failed to delete supplier: "; }
    public static get SUPPLIER_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'Tel', 'View', 'Del']; }
    public static get SUPPLIER_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'Tel', 'Select']; }


    //Customer Specific Text
    public static get CUSTOMER_UPDATE_TITLE(): string { return "Customer Update"; }
    public static get CUSTOMER_CREATE_TITLE(): string { return "Create New Customer"; }
    public static get CUSTOMER_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new customer: "; }
    public static get CUSTOMER_CREATE_SUCCESS_MSG(): string { return "Successfully created customer: "; }
    public static get CUSTOMER_CREATE_FAILED_MSG(): string { return "Failed to create customer: "; }
    public static get CUSTOMER_READ_FAILED_MSG(): string { return "Failed to retrieve customer data: "; }
    public static get CUSTOMER_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update customer: "; }
    public static get CUSTOMER_UPDATE_SUCCESS_MSG(): string { return "Successfully updated customer: "; }
    public static get CUSTOMER_UPDATE_FAILED_MSG(): string { return "Failed to update customer: "; }
    public static get CUSTOMER_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete customer: "; }
    public static get CUSTOMER_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete customer: "; }
    public static get CUSTOMER_DELETE_SUCCESS_MSG(): string { return "Successfully deleted customer: "; }
    public static get CUSTOMER_DELETE_FAILED_MSG(): string { return "Failed to delete customer: "; }
    public static get CUSTOMER_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'Tel', 'View', 'Del']; }
    public static get CUSTOMER_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'Tel', 'Select']; }


    //User Specific Text
    public static get USER_UPDATE_TITLE(): string { return "User Update"; }
    public static get USER_CREATE_TITLE(): string { return "Create New User"; }
    public static get USER_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new user: "; }
    public static get USER_CREATE_SUCCESS_MSG(): string { return "Successfully created user: "; }
    public static get USER_CREATE_FAILED_MSG(): string { return "Failed to create user: "; }
    public static get USER_READ_FAILED_MSG(): string { return "Failed to retrieve user data: "; }
    public static get USER_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update user: "; }
    public static get USER_UPDATE_SUCCESS_MSG(): string { return "Successfully updated user: "; }
    public static get USER_UPDATE_FAILED_MSG(): string { return "Failed to update user: "; }
    public static get USER_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete user: "; }
    public static get USER_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete user: "; }
    public static get USER_DELETE_SUCCESS_MSG(): string { return "Successfully deleted user: "; }
    public static get USER_DELETE_FAILED_MSG(): string { return "Failed to delete user: "; }
    public static get USER_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Name', 'Email', 'View', 'Del']; }
    public static get USER_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Name', 'Email', 'Select']; }
    public static get USER_LINKED_ACCT_COLUMNS(): string[] { return ['ID', 'Code', 'Name', 'Del']; }

    //Order Specific Text
    public static get ORDER_UPDATE_TITLE(): string { return "Order Update"; }
    public static get ORDER_CREATE_TITLE(): string { return "Create New Order"; }
    public static get ORDER_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new order: "; }
    public static get ORDER_CREATE_SUCCESS_MSG(): string { return "Successfully created order: "; }
    public static get ORDER_CREATE_FAILED_MSG(): string { return "Failed to create order: "; }
    public static get ORDER_READ_FAILED_MSG(): string { return "Failed to retrieve order data: "; }
    public static get ORDER_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update order: "; }
    public static get ORDER_UPDATE_SUCCESS_MSG(): string { return "Successfully updated order: "; }
    public static get ORDER_UPDATE_FAILED_MSG(): string { return "Failed to update order: "; }
    public static get ORDER_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete order: "; }
    public static get ORDER_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete order: "; }
    public static get ORDER_DELETE_SUCCESS_MSG(): string { return "Successfully deleted order: "; }
    public static get ORDER_DELETE_FAILED_MSG(): string { return "Failed to delete order: "; }
    public static get ORDER_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Customer', 'Status', 'DeliveryDate', 'View', 'Del']; }
    public static get ORDER_PRVW_SELECT_COLUMNS(): string[] { return ['ID', 'Customer', 'Status', 'DeliveryDate', 'Select']; }
    public static get ORDER_DELIVERY_ATTEMPT(): string { return "Attempting to deliver order: "; }
    public static get ORDER_DELIVERY_SUCCESS(): string { return "Successfully delivered order: "; }
    public static get ORDER_DELIVERY_FAILED(): string { return "Failed to deliver order: "; }
    public static get ORDER_INVOICE_ATTEMPT(): string { return "Attempting to generate invoice for order: "; }
    public static get ORDER_INVOICE_SUCCESS(): string { return "Successfully generate invoice for order: "; }
    public static get ORDER_INVOICE_FAILED(): string { return "Failed to generate invoice for order: "; }

    //Order Item Text
    public static get ORDER_ITEM_UPDATE_TITLE(): string { return "Update Order Item"; }
    public static get ORDER_ITEM_ADD_TITLE(): string { return "Add Order Item"; }
    public static get ORDER_ITEM_LIST_COUMNS(): string[] { return ['Code', 'Name', 'Status', 'Price', 'Qty', 'View', 'Del']; }
    public static get ORDER_ITEM_SELECT_COUMNS(): string[] { return ['Code', 'Name', 'Status', 'Price', 'Qty', 'Select']; }
    public static get ORDER_ITEM_CREATE_ATTEMPT_MSG(): string { return "Adding new item: "; }
    public static get ORDER_ITEM_CREATE_FAILED_MSG(): string { return 'Failed to add new item: '; }
    public static get ORDER_ITEM_DELETE_ATTEMPT_MSG(): string { return 'Removing item: '; }
    public static get ORDER_ITEM_DELETE_SUCCESS_MSG(): string { return 'Successfully removed item: '; }
    public static get ORDER_ITEM_DELETE_FAILED_MSG(): string { return 'Error removing item:  '; }
    public static get ORDER_ITEM_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update order item: "; }
    public static get ORDER_ITEM_UPDATE_SUCCESS_MSG(): string { return "Successfully updated order item: "; }
    public static get ORDER_ITEM_UPDATE_FAILED_MSG(): string { return "Failed to update order item: "; }

    //Delivery Note Text
    public static get DELIVERY_NOTE_READ_FAILED_MSG(): string { return "Failed to retrieve delivery note data: "; }
    public static get DELIVERY_NOTE_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'CustomerName', 'DeliveryDate', 'View']; }
    public static get DELIVERY_NOTE_ITEM_PRVW_LIST_COLUMNS(): string[] { return ['ItemDesc', 'Code', 'Qty']; }

    //Invoice Text
    public static get INVOICE_READ_FAILED_MSG(): string { return "Failed to retrieve invoice data: "; }
    public static get INVOICE_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'CustomerName', 'InvoiceDate', 'Status', 'InvoiceTotal', 'View']; }
    public static get INVOICE_ITEM_PRVW_LIST_COLUMNS(): string[] { return ['ItemDesc', 'Code', 'Price', 'Qty', 'Total']; }

    //Content Text
    public static get CONTENT_UPDATE_ABOUT_ATTEMPT(): string { return "Updating About Page"; }
    public static get CONTENT_UPDATE_LANDING_ATTEMPT(): string { return "Updating Landing Page"; }
    public static get CONTENT_UPDATE_CONTACT_ATTEMPT(): string { return "Updating Contact Page"; }
    public static get CONTENT_UPDATE_SITE_CONFIG_ATTEMPT(): string { return "Updating Site Config"; }
    public static get CONTENT_UPDATE_ABOUT_SUCCESS(): string { return "Updating About Page Complete"; }
    public static get CONTENT_UPDATE_LANDING_SUCCESS(): string { return "Updating Landing Page Complete"; }
    public static get CONTENT_UPDATE_CONTACT_SUCCESS(): string { return "Updating Contact Page Complete"; }
    public static get CONTENT_UPDATE_SITE_CONFIG_SUCCESS(): string { return "Updating Site Config Complete"; }
    public static get CONTENT_UPDATE_ABOUT_FAILED(): string { return "Updating About Page Failed: "; }
    public static get CONTENT_UPDATE_LANDING_FAILED(): string { return "Updating Landing Failed: "; }
    public static get CONTENT_UPDATE_CONTACT_FAILED(): string { return "Updating Contact Failed: "; }
    public static get CONTENT_UPDATE_SITE_CONFIG_FAILED(): string { return "Updating Site Config Failed: "; }
    public static get CONTENT_READ_ATTEMPT(): string { return "Getting Page Info..."; }
    public static get CONTENT_READ_FAILED(): string { return "Failed to read content: "; }

    //RMA Specific Text
    public static get RMA_UPDATE_TITLE(): string { return "RMA Update"; }
    public static get RMA_CREATE_TITLE(): string { return "Create New RMA"; }
    public static get RMA_CREATE_ATTEMPT_MSG(): string { return "Attempting to create new RMA: "; }
    public static get RMA_CREATE_SUCCESS_MSG(): string { return "Successfully created RMA: "; }
    public static get RMA_CREATE_FAILED_MSG(): string { return "Failed to create RMA: "; }
    public static get RMA_READ_FAILED_MSG(): string { return "Failed to retrieve RMA data: "; }
    public static get RMA_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update RMA: "; }
    public static get RMA_UPDATE_SUCCESS_MSG(): string { return "Successfully updated RMA: "; }
    public static get RMA_UPDATE_FAILED_MSG(): string { return "Failed to update RMA: "; }
    public static get RMA_DELETE_CONFIRM_MSG(): string { return "--WARNING THIS PROCESS CAN'T BE UN-DONE-- Are you sure you wish to delete RMA: "; }
    public static get RMA_DELETE_ATTEMPT_MSG(): string { return "Attempting to delete RMA: "; }
    public static get RMA_DELETE_SUCCESS_MSG(): string { return "Successfully deleted RMA: "; }
    public static get RMA_DELETE_FAILED_MSG(): string { return "Failed to delete RMA: "; }
    public static get RMA_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'Order', 'Customer', 'Status', 'Created', 'View', 'Del']; }
    public static get RMA_RETURN_ATTEMPT(): string { return "Attempting to process return for RMA: "; }
    public static get RMA_RETURN_SUCCESS(): string { return "Successfully processed return for RMA: "; }
    public static get RMA_RETURN_FAILED(): string { return "Failed to process return for RMA: "; }
    public static get RMA_CREDIT_NOTE_ATTEMPT(): string { return "Attempting to generate invoice for RMA: "; }
    public static get RMA_CREDIT_NOTE_SUCCESS(): string { return "Successfully generate invoice for RMA: "; }
    public static get RMA_CREDIT_NOTE_FAILED(): string { return "Failed to generate invoice for RMA: "; }

    //RMA Item Text
    public static get RMA_ITEM_UPDATE_TITLE(): string { return "Update RMA Item"; }
    public static get RMA_ITEM_ADD_TITLE(): string { return "Add RMA Item"; }
    public static get RMA_ITEM_LIST_COUMNS(): string[] { return ['Description', 'Status', 'Restock','Qty', 'Reason', 'View', 'Del']; }
    public static get RMA_ITEM_CREATE_ATTEMPT_MSG(): string { return "Adding new RMA item: "; }
    public static get RMA_ITEM_CREATE_FAILED_MSG(): string { return 'Failed to add new RMA item: '; }
    public static get RMA_ITEM_DELETE_ATTEMPT_MSG(): string { return 'Removing RMA item: '; }
    public static get RMA_ITEM_DELETE_SUCCESS_MSG(): string { return 'Successfully removed RMA item: '; }
    public static get RMA_ITEM_DELETE_FAILED_MSG(): string { return 'Error removing RMA item:  '; }
    public static get RMA_ITEM_UPDATE_ATTEMPT_MSG(): string { return "Attempting to update RMA item: "; }
    public static get RMA_ITEM_UPDATE_SUCCESS_MSG(): string { return "Successfully updated RMA item: "; }
    public static get RMA_ITEM_UPDATE_FAILED_MSG(): string { return "Failed to update RMA item: "; }

    //Return Note Text
    public static get RETURN_NOTE_READ_FAILED_MSG(): string { return "Failed to retrieve return note data: "; }
    public static get RETURN_NOTE_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'CustomerName', 'ReturnDate', 'View']; }
    public static get RETURN_NOTE_ITEM_PRVW_LIST_COLUMNS(): string[] { return ['ItemDesc', 'Code', 'Qty']; }

    //Credit Note Text
    public static get CREDIT_NOTE_READ_FAILED_MSG(): string { return "Failed to retrieve credit note data: "; }
    public static get CREDIT_NOTE_PRVW_LIST_COLUMNS(): string[] { return ['ID', 'CustomerName', 'CreditDate', 'Status', 'CreditTotal', 'View']; }
    public static get CREDIT_NOTE_ITEM_PRVW_LIST_COLUMNS(): string[] { return ['ItemDesc', 'Code', 'Price', 'Qty', 'Total']; }
}

export class CustomModalSettings {
    minWidth: number;
    maxWidth: number;
    width: string;
    disableClose: boolean;
    autoFocus: boolean;
    data: any;
}