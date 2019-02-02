USE ShopperHolic
GO
PRINT 'Insert CustomerTypes'
INSERT INTO CustomerTypes
    (CustomerTypeCode   ,CustomerTypeName)
VALUES
    ('CASH'             ,'Cash Customer'),
    ('ACCT'             ,'Account Customer')
GO

/*-------------------------------------
ORDERING:
InvoiceItems (Via Stored Proc)
InvoiceHeaders (Via Stored Proc)
DeliveryNotes (Via Stored Proc)
DeliveryNoteItems (Via Stored Proc)
OrderItems
OrderHeaders
OrderStatus
InvoiceStatus
-------------------------------------*/
PRINT 'Insert Order Status'
INSERT INTO OrderStatus
    (OrderStatusValue)
VALUES
    ('Estimate'),
    ('Delivered'),
    ('Complete')
GO

PRINT 'Insert InvoiceStatus'
INSERT INTO InvoiceStatus
    (InvoiceStatusValue)
VALUES
    ('Generated'),
    ('Posted'),
    ('Paid')
GO 



/*-------------------------------------
PURCHASING:
PurchaseInvoiceStatus
PurchaseOrderStatus
PurchaseOrderHeaders
PurchaseOrderItems
GoodsReceivedNotes
GoodsReceivedNoteItems
PurchaseInvoiceHeaders
PurchaseInvoiceItems
-------------------------------------*/
PRINT 'Insert Purchase Order Status'
INSERT INTO PurchaseOrderStatus
    (PurchaseOrderStatusValue)
VALUES
    ('Tender'),
    ('Awaiting Delivery'),
    ('Goods Received'),
    ('Complete')
GO

PRINT 'Insert Purchase Invoice Status'
INSERT INTO PurchaseInvoiceStatus
    (PurchaseInvoiceStatusValue)
VALUES
    ('Received'),
    ('Paid')
GO 



/*-------------------------------------
User Security:
Users
UserRoleTypes
UserClaimTypes
UserClaims
UserRoles
CustomerLogins
SupplierLogins -- TODO
-------------------------------------*/
PRINT 'Insert UserClaimTypes'
INSERT INTO UserClaimTypes
    (UserClaimTypeName)
VALUES
    ('IsAdminUser'),
    ('UserCanCreateProductGroup'),
    ('UserCanEditProductGroup'),
    ('UserCanDeleteProductGroup'),
    ('UserCanCreateSubGroup'),
    ('UserCanEditSubGroup'),
    ('UserCanDeleteSubGroup'),
    ('UserCanCreateItem'),
    ('UserCanEditItem'),
    ('UserCanDeleteItem'),
    ('UserCanCreateCountry'),
    ('UserCanEditCountry'),
    ('UserCanDeleteCountry'),
    ('UserCanCreateCity'),
    ('UserCanEditCity'),
    ('UserCanDeleteCity'),
    ('UserCanCreateCityArea'),
    ('UserCanEditCityArea'),
    ('UserCanDeleteCityArea'),
    ('UserCanCreateAddress'),
    ('UserCanEditAddress'),
    ('UserCanDeleteAddress'),
    ('UserCanCreateCustomer'),
    ('UserCanEditCustomer'),
    ('UserCanDeleteCustomer'),
    ('UserCanCreateSupplier'),
    ('UserCanEditSupplier'),
    ('UserCanDeleteSupplier'),
    ('UserCanDeleteOrder'),
    ('UserCanDeliverOrder'),
    ('UserCanInvoiceOrder')
GO

PRINT 'Insert UserRolesTypes'
INSERT INTO UserRoleTypes
    (UserRoleName)
VALUES  
    ('Administrator'),
    ('Customer'),
    ('TillOperator')
GO

PRINT 'Create Test Users'
Exec CreateNewUser 'Faisal', 'ZUCU6YavUNL89WSjagV1kPkiIL3e5FCEwc1YONXUn5Y=', 'chinkey', 'faisal@ahmedmail.info', 1 
GO

/*-------------------------------------
App Security:
AuthorizedApplications
-------------------------------------*/
PRINT 'Insert AuthorizedApplications'
INSERT INTO AuthorizedApplications
    (AppName, AppSecret)
VALUES
    ('MirpurPVC','ThisIsAVeryLongSecretForTestingPurposesOnlyChangedOnLiveServerAlsoEncryptAtSomePoint')
GO

