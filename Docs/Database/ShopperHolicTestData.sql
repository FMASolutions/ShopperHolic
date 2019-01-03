USE ShopperHolic
GO
/*-------------------------------------
STOCK STRUCTURE:
Items
SubGroups
ProductGroups
-------------------------------------*/
PRINT 'Insert Product Groups'
INSERT INTO ProductGroups       
    (ProductGroupCode   ,ProductGroupName   ,ProductGroupDescription)
VALUES      
    ('PANELS'           ,'PVC Panel'       ,'PVC Panels'),
    ('TILES'            ,'PVC Tile'        ,'PVC Tiles'),
    ('ACCESS'           ,'Accessorie'      ,'Accessories')
GO

PRINT 'Insert Sub Groups'
INSERT INTO SUBGROUPS
    (SubGroupCode   ,ProductGroupID ,SubGroupName      ,SubGroupDescription)
VALUES
    ('WPANELS'      ,1              ,'Wall Panel'      ,'Wall Panels'),
    ('CPANELS'      ,1              ,'Ceiling Panel'   ,'Ceiling Panels'),
    ('WTILES'       ,2              ,'Wall Tile'       ,'Waill Tiles'),
    ('CTILES'       ,2              ,'Ceiling Tile'    ,'Ceiling Tiles'),
    ('SCREWS'       ,3              ,'Panel Screw'     ,'Panel Screws'),
    ('GLUE'         ,3              ,'Tile Glue'       ,'Tile Glue')
GO

PRINT 'Insert Items'
INSERT INTO ITEMS
    (  ItemCode   ,SubGroupID ,ItemName               ,ItemDescription                ,ItemUnitPrice  ,ItemUnitPriceWithMaxDiscount   ,ItemAvailableQty   ,ItemReorderQtyReminder ,ItemImageFilename)
VALUES
/*01*/('WPNLBLU'  ,1          ,'Blue Wall Panels'     ,'Blue Wall Panels 5 Pack'      ,1.99           ,1.49                           ,20                 ,5                      ,'Random.jpeg'),
/*02*/('WPNLRED'  ,1          ,'Red Wall Panels'      ,'Red Wall Panels 5 Pack'       ,1.99           ,1.49                           ,20                 ,5                      ,'Random.jpeg'),
/*03*/('CPNLBLU'  ,2          ,'Blue Ceiling Panels'  ,'Blue Ceiling Panels 7 Pack'   ,3.99           ,1.99                           ,20                 ,5                      ,'Random.jpeg'),
/*04*/('CPNLRED'  ,2          ,'Red Ceiling Panels'   ,'Red Ceiling Panels 7 Pack'    ,3.99           ,1.99                           ,20                 ,5                      ,'Random.jpeg'),
/*05*/('WTILGRN'  ,3          ,'Green Wall Tiles'     ,'Green Wall Tiles 5 Pack'      ,1.79           ,1.29                           ,20                 ,5                      ,'Random.jpeg'),
/*06*/('WTILRED'  ,3          ,'Red Wall Tiles'       ,'Red Wall Tiles 5 Pack'        ,1.99           ,1.49                           ,20                 ,5                      ,'Random.jpeg'),
/*07*/('CTILORG'  ,4          ,'Orange Ceilig Tiles'  ,'Orange Ceiling Tiles 7 Pack'  ,4.59           ,3.99                           ,20                 ,5                      ,'Random.jpeg'),
/*08*/('CTILPNK'  ,4          ,'Pink Ceiling Tiles'   ,'Pink Ceiling Tiles'           ,3.99           ,1.99                           ,20                 ,5                      ,'Random.jpeg'),
/*09*/('TILSCRW'  ,5          ,'Tile Screws'          ,'Tile Screws 10 Pack'          ,0.49           ,0.39                           ,200                ,50                     ,'Random.jpeg'),
/*10*/('PNLSCRW'  ,5          ,'Panel Screws'         ,'Panel Screws 10 Pack'         ,0.49           ,0.39                           ,200                ,50                     ,'Random.jpeg'),
/*11*/('TILGLUE'  ,6          ,'Tile Glue'            ,'Tile Glue 500ML'              ,1.29           ,0.99                           ,75                 ,25                     ,'Random.jpeg'),
/*12*/('PNLGLUE'  ,6          ,'Panel Glue'           ,'Panel Glue 500ML'             ,1.29           ,0.99                           ,75                 ,25                     ,'Random.jpeg')
GO


/*-------------------------------------
ADDRESS:
AddressLocations
CityAreas
Cities
Countries
-------------------------------------*/
PRINT 'Insert Countries'
INSERT INTO Countries
    (CountryCode    ,CountryName)
VALUES
    ('UK'           ,'United Kingdom'),
    ('PK'           ,'Pakistan')
GO

PRINT 'Insert Cities'
INSERT INTO Cities
    (CityCode   ,CountryID  ,CityName)
VALUES
    ('NOTTS'    ,1          ,'Nottingham'),
    ('MNCR'     ,1          ,'Manchester'),
    ('MIRPUR'   ,2          ,'Mirpur'),
    ('GUJRAT'   ,2          ,'Gujrat')
GO

PRINT 'Insert CityAreas'
INSERT INTO CityAreas(
    CityAreaCode    ,CityID ,CityAreaName)
VALUES
/*01*/('BKR'          ,1      ,'Bakersfield'),
/*02*/('SNTN'         ,1      ,'Sneinton'),
/*03*/('CSTLFLD'      ,2      ,'Castlefield'),
/*04*/('BRNAGE'       ,2      ,'Burnage'),
/*05*/('F1'           ,3      ,'F1 Zone'),
/*06*/('F2'           ,3      ,'F2 Zone'),
/*07*/('F3'           ,3      ,'F3 Zone'),
/*08*/('F4'           ,3      ,'F4 Zone'),
/*09*/('F5'           ,3      ,'F5 Zone'),
/*10*/('MNDMPR'       ,4      ,'Mandi Mirpur'),
/*11*/('BZGWL'        ,4      ,'Buzrgwal')
GO

PRINT 'Insert AddressLocations'
INSERT INTO AddressLocations
    (AddressLine1   ,AddressLine2           ,CityAreaID ,PostCode)
VALUES
/*01*/('36'           ,'Bewick Drive'         ,1          ,'NG3 7GB'),
/*02*/('39'           ,'Westwood Road'        ,2          ,'NG2 4FT'),
/*03*/('72'           ,'Morick Drive'         ,3          ,'MN3 7RB'),
/*04*/('29'           ,'Forester Road'        ,4          ,'MN4 9JA'),
/*05*/('12'           ,'Laal Chook'           ,5          ,'123456'),
/*06*/('77'           ,'Maan Road'            ,6          ,'987654'),    
/*07*/('11'           ,'Ahmed Ghar'           ,10         ,'321456'),
/*08*/('36'           ,'Rami Makan'           ,11         ,'456987')
GO
/*-------------------------------------
CUSTOMERS
Customers
CustomerTypes
-------------------------------------*/
PRINT 'Insert CustomerTypes'
INSERT INTO CustomerTypes
    (CustomerTypeCode   ,CustomerTypeName)
VALUES
    ('CASH'             ,'Cash Customer'),
    ('ACCT'             ,'Account Customer')
GO

PRINT 'Insert Customers'
INSERT INTO Customers
    (CustomerTypeID ,DefaultAddressID   ,CustomerCode   ,CustomerName           ,CustomerContactNumber  ,CustomerEmailAddress)
VALUES
    (1              ,3                  ,'CASH'         ,'Cash Customer'        ,'N/A'                  ,'N/A'),
    (2              ,1                  ,'FMALTD'       ,'FMA Solutions LTD'    ,'07532282222'          ,'faisal@ahmedmail.info'),
    (2              ,2                  ,'ZAL'          ,'Zulkar Ltd'           ,'+92 533 572127'       ,'Zalk@Yahoo.com')
GO
/*-------------------------------------
ORDERS:
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

PRINT 'Insert OrderHeaders'
INSERT INTO OrderHeaders
    (CustomerID ,AddressID  ,OrderStatusID  ,OrderDate                  ,DeliveryDate)
VALUES
    (2          ,1          ,1              ,DATEADD(DAY,-3,GetDate())  ,DATEADD(DAY,-2,GetDate())), --Complete Order
    (2          ,2          ,1              ,DATEADD(DAY,-3,GetDate())  ,DATEADD(DAY,-2,GetDate())), --Estimate Order
    (1          ,3          ,1              ,DATEADD(DAY,-3,GetDate())  ,DATEADD(DAY,-2,GetDate())), --Delivered ()
    (3          ,4          ,1              ,DATEADD(DAY,-3,GetDate())  ,DATEADD(DAY,-2,GetDate())), --Delivered
    (3          ,5          ,1              ,DATEADD(DAY,-3,GetDate())  ,DATEADD(DAY,-2,GetDate()))  --MIX LOTS OF ITEMS!!!!
GO

PRINT 'Insert OrderItems'
INSERT INTO OrderItems
    (OrderHeaderID  ,ItemID ,OrderItemStatusID  ,OrderItemUnitPrice ,OrderItemUnitPriceAfterDiscount    ,OrderItemQty   ,OrderItemDescription)
VALUES
    (1              ,1      ,1                  ,1.99               ,1.99                               ,1              ,'Blue Wall Panels 5 Pack'),
    (1              ,2      ,1                  ,2.99               ,2.99                               ,3              ,'Red Wall Panels 5 Pack'),
    (2              ,3      ,1                  ,3.99               ,3.99                               ,5              ,'Blue Ceiling Panels 7 Pack'),
    (2              ,4      ,1                  ,4.99               ,3.99                               ,4              ,'Red Ceiling Panels 7 Pack'),
    (3              ,5      ,1                  ,5.99               ,4.99                               ,7              ,'Green Wall Tiles 5 Pack'),
    (3              ,6      ,1                  ,6.99               ,5.99                               ,1              ,'Red Wall Tiles 5 Pack'),
    (4              ,7      ,1                  ,7.99               ,6.99                               ,2              ,'Orange Ceiling Tiles 7 Pack'),
    (4              ,8      ,1                  ,8.99               ,7.99                               ,4              ,'Pink Ceiling Tiles 7 Pack'),
    (5              ,1      ,1                  ,5.99               ,6.99                               ,1              ,'Random Diff 1'),
    (5              ,2      ,1                  ,6.99               ,7.99                               ,2              ,'Random Diff 2'),
    (5              ,3      ,1                  ,7.99               ,8.99                               ,3              ,'Random Diff 3'),
    (5              ,4      ,1                  ,8.99               ,9.99                               ,4              ,'Random Diff 4'),
    (5              ,5      ,1                  ,9.99               ,10.99                              ,5              ,'Random Diff 5'),
    (5              ,6      ,1                  ,10.99              ,11.99                              ,6              ,'Random Diff 6'),
    (5              ,7      ,1                  ,11.99              ,12.99                              ,7              ,'Random Diff 7'),
    (5              ,8      ,1                  ,12.99              ,13.99                              ,8              ,'Random Diff 8')
GO
PRINT 'Delivery Order 1'
Exec DeliverExistingItems 1 
GO
PRINT 'Delivery Order 2'
Exec DeliverExistingItems 2 
GO
PRINT 'Delivery Order 3'
Exec DeliverExistingItems 3 
GO
PRINT 'Delivery Order 4'
Exec DeliverExistingItems 4 
GO
PRINT 'Gen Invoice Order 1'
Exec GenerateInvoiceForOrder 1
GO
PRINT 'Gen Invoice Order 2'
Exec GenerateInvoiceForOrder 2
GO
PRINT 'Gen Invoice Order 3'
Exec GenerateInvoiceForOrder 3
GO
/*-------------------------------------
User Security:
Users
UserRoleTypes
UserClaimTypes
UserRoles
UserClaims
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
    ('UserCanDeleteItem')
GO

PRINT 'Insert UserRolesTypes'
INSERT INTO UserRoleTypes
    (UserRoleName)
VALUES  
    ('Administrator'),
    ('Customer'),
    ('TillOperator')
GO

PRINT 'Insert Users'
INSERT INTO Users
    (Username, EncryptedPassword, KnownAs, EmailAddress)
VALUES
    ('Faisal', 'testencryptedpassword', 'chinkey', 'faisal@ahmedmail.info'),
    ('Zulkar','testencryptedpassword','zal','zal@hotmail.com'),
    ('TestCustomer','testencryptedpassword','tester1','tester1@ahmedmail.info'),
    ('Minaccess','testencryptedpassword','tester2','tester2@ahmedmail.info')
GO

PRINT 'Insert UserClaims'
--TODO FILL OUT ALL CLAIMS FOR ALL USERS
INSERT INTO UserClaims
    (UserClaimTypeID, UserID, ClaimValue)
VALUES
    (1,1,'true'), -- IsAdminUser / Faisal 
    (2,1,'true'), -- UserCanCreateProductGroup / Faisal
    (3,1,'true'), -- UserCanEditProductGroup / Faisal
    (4,1,'true'), -- UserCanDeleteProductGroup / Faisal
    (5,1,'true'), -- UserCanCreateSubGroup / Faisal
    (6,1,'true'), -- UserCanEditSubGroup / Faisal
    (7,1,'true'), -- UserCanDeleteSubGroup / Faisal
    (8,1,'true'), -- UserCanCreateItem / Faisal
    (9,1,'true'), -- UserCanEditItem / Faisal
    (10,1,'true'), -- USerCanDeleteItem / Faisal
    (1,2,'true'), -- IsAdminUser / Zulkar 
    (2,2,'true'), -- UserCanCreateProductGroup / Zulkar
    (3,2,'true'), -- UserCanEditProductGroup / Zulkar
    (4,2,'true'), -- UserCanDeleteProductGroup / Zulkar
    (5,2,'true'), -- UserCanCreateSubGroup / Zulkar
    (6,2,'true'), -- UserCanEditSubGroup / Zulkar
    (7,2,'true'), -- UserCanDeleteSubGroup / Zulkar
    (8,2,'true'), -- UserCanCreateItem / Zulkar
    (9,2,'true'), -- UserCanEditItem / Zulkar
    (10,2,'true'), -- USerCanDeleteItem / Zulkar
    (1,3,'false'), -- IsAdminUser / TestCustomer 
    (2,3,'false'), -- UserCanCreateProductGroup / TestCustomer
    (3,3,'false'), -- UserCanEditProductGroup / TestCustomer
    (4,3,'false'), -- UserCanDeleteProductGroup / TestCustomer
    (5,3,'false'), -- UserCanCreateSubGroup / TestCustomer
    (6,3,'false'), -- UserCanEditSubGroup / TestCustomer
    (7,3,'false'), -- UserCanDeleteSubGroup / TestCustomer
    (8,3,'false'), -- UserCanCreateItem / TestCustomer
    (9,3,'false'), -- UserCanEditItem / TestCustomer
    (10,3,'false'), -- USerCanDeleteItem / TestCustomer
    (1,4,'false'), -- IsAdminUser / Minaccess 
    (2,4,'false'), -- UserCanCreateProductGroup / Minaccess
    (3,4,'false'), -- UserCanEditProductGroup / Minaccess
    (4,4,'false'), -- UserCanDeleteProductGroup / Minaccess
    (5,4,'false'), -- UserCanCreateSubGroup / Minaccess
    (6,4,'false'), -- UserCanEditSubGroup / Minaccess
    (7,4,'false'), -- UserCanDeleteSubGroup / Minaccess
    (8,4,'false'), -- UserCanCreateItem / Zulkar
    (9,4,'false'), -- UserCanEditItem / Zulkar
    (10,4,'false') -- USerCanDeleteItem / Zulkar
GO

PRINT 'Insert UserRoles'
INSERT INTO UserRoles
    (UserRoleTypeID,UserID)
VALUES
    (1,1), --Administrator / Faisal
    (1,2), -- Administrator / Zulkar
    (2,3), -- Customer / TestCustomer
    (3,4) -- TillOperator / Minaccess
GO

PRINT 'Insert CustomerLogins'
INSERT INTO CustomerLogins
    (CustomerID, UserID)
VALUES
    (2,1), -- FMASolutionsLtd / Faisal
    (3,2)   -- Zulkar Ltd / Zulkar
GO
/*-------------------------------------
App Security:
AuthorizedApplications
RefreshTokens
-------------------------------------*/
PRINT 'Insert AuthorizedApplications'
INSERT INTO AuthorizedApplications
    (AppName, AppSecret)
VALUES
    ('MirpurPVC','ThisIsAVeryLongSecretForTestingPurposesOnlyChangedOnLiveServerAlsoEncryptAtSomePoint')
GO

PRINT 'Insert RefreshTokens'
INSERT INTO RefreshTokens
    (AppID, RefreshToken)
VALUES
    (1, NewID())
GO
/*----------------------------------
RETRIEVE DATA FOR VIEWING PLEASURE
----------------------------------*/
SELECT * FROM ProductGroups
SELECT * FROM SubGroups
SELECT * FROM Items

SELECT * FROM Countries
SELECT * FROM Cities
SELECT * FROM CityAreas
SELECT * FROM AddressLocations

SELECT * FROM CustomerTypes
SELECT * FROM Customers

SELECT * FROM InvoiceStatus
SELECT * FROM OrderStatus
SELECT * FROM OrderHeaders
SELECT * FROM OrderItems
SELECT * FROM DeliveryNotes
SELECT * FROM DeliveryNoteItems
SELECT * FROM InvoiceHeaders
SELECT * FROM InvoiceItems

SELECT * FROM UserClaimTypes
SELECT * FROM UserRoleTypes
SELECT * FROM Users
SELECT * FROM UserRoles
SELECT * FROM UserClaims
SELECT * FROM CustomerLogins

SELECT * FROM AuthorizedApplications
SELECT * FROM RefreshTokens
SELECT * FROM Tokens
SELECT * FROM AccessKeys
GO