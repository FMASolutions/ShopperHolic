namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public enum EClaimTypes
    {
        IsAdminUser = 1,
        UserCanCreateProductGroup,
        UserCanEditProductGroup,
        UserCanDeleteProductGroup,
        UserCanCreateSubGroup,
        UserCanEditSubGroup,
        UserCanDeleteSubGroup,
        UserCanCreateItem,
        UserCanEditItem,
        UserCanDeleteItem,
        UserCanCreateCountry,
        UserCanEditCountry,
        UserCanDeleteCountry,
        UserCanCreateCity,
        UserCanEditCity,
        UserCanDeleteCity,
        UserCanCreateCityArea,
        UserCanEditCityArea,
        UserCanDeleteCityArea,
        UserCanCreateAddress,
        UserCanEditAddress,
        UserCanDeleteAddress,
        UserCanCreateCustomer,
        UserCanEditCustomer,
        UserCanDeleteCustomer,
        UserCanCreateSupplier,
        UserCanEditSupplier,
        UserCanDeleteSupplier,
        UserCanDeleteOrder,
        UserCanDeliverOrder,
        UserCanInvoiceOrder
    }
}