-- Create a new database called 'ShopBroDB' if it doesn't exist already
USE master
GO
IF NOT EXISTS (
    SELECT name
FROM sys.databases
WHERE name = N'ShopperHolic'
)
CREATE DATABASE ShopperHolic
GO
USE ShopperHolic
GO
/*
DROP TABLES IN REQUIRED ORDER IF NEEDED:
*/
DROP TABLE InvoiceItems
DROP TABLE InvoiceHeaders
DROP TABLE DeliveryNoteItems
DROP TABLE DeliveryNotes
DROP TABLE OrderItems
DROP TABLE OrderHeaders
DROP TABLE OrderStatus
DROP TABLE InvoiceStatus
DROP TABLE CustomerLogins
DROP TABLE Customers
DROP TABLE CustomerTypes
DROP TABLE AddressLocations
DROP TABLE CityAreas
DROP TABLE Cities
DROP TABLE Countries
DROP TABLE Items
DROP TABLE SubGroups
DROP TABLE ProductGroups
DROP TABLE RefreshTokens
DROP TABLE AuthorizedApplications
DROP TABLE AccessKeys
DROP TABLE Tokens
DROP TABLE UserRoles
DROP TABLE UserClaims
DROP TABLE UserRoleTypes
DROP TABLE UserClaimTypes
DROP TABLE Users
DROP TABLE AuditLogs
DROP TABLE AuditLogTypes
DROP PROCEDURE dbo.DeliverExistingItems
DROP PROCEDURE dbo.GenerateInvoiceForOrder
DROP PROCEDURE dbo.AuthenticateUserAndGetExchangeKey
DROP PROCEDURE dbo.VerifyAccessKey


CREATE TABLE ProductGroups
(
    ProductGroupID INT IDENTITY(1,1) PRIMARY KEY,
    ProductGroupCode VARCHAR(7) NOT NULL UNIQUE,
    ProductGroupName VARCHAR(50) NOT NULL,
    ProductGroupDescription VARCHAR(250) NOT NULL
)
GO
CREATE TABLE SubGroups
(
    SubGroupID INT IDENTITY(1,1) PRIMARY KEY,
    SubGroupCode VARCHAR(7) NOT NULL UNIQUE,
    ProductGroupID INT FOREIGN KEY REFERENCES ProductGroups(ProductGroupID),
    SubGroupName VARCHAR(100) NOT NULL,
    SubGroupDescription VARCHAR(250) NOT NULL
)
CREATE TABLE Items
(
    ItemID INT IDENTITY(1,1) PRIMARY KEY,
    ItemCode VARCHAR(7) NOT NULL UNIQUE,
    SubGroupID INT FOREIGN KEY REFERENCES SubGroups(SubGroupID),
    ItemName VARCHAR(100) NOT NULL,
    ItemDescription VARCHAR(250) NOT NULL,
    ItemUnitPrice DECIMAL(12,4) NOT NULL,
    ItemUnitPriceWithMaxDiscount DECIMAL(12,4) NOT NULL,
    ItemAvailableQty INT NOT NULL,
    ItemReorderQtyReminder INT NOT NULL,
    ItemImageFilename VARCHAR(500) NOT NULL
)
GO
CREATE TABLE Countries
(
    CountryID INT IDENTITY(1,1) PRIMARY KEY,
    CountryCode VARCHAR(7) NOT NULL UNIQUE,
    CountryName VARCHAR(100) NOT NULL
)
GO
CREATE TABLE Cities
(
    CityID INT IDENTITY(1,1) PRIMARY KEY,
    CityCode VARCHAR(7) NOT NULL UNIQUE,
    CountryID INT FOREIGN KEY REFERENCES Countries(CountryID),
    CityName VARCHAR(100) NOT NULL
)
GO
CREATE TABLE CityAreas
(
    CityAreaID INT IDENTITY(1,1) PRIMARY KEY,
    CityAreaCode VARCHAR(7) NOT NULL UNIQUE,
    CityID INT FOREIGN KEY REFERENCES Cities(CityID),
    CityAreaName VARCHAR(100) NOT NULL
)
GO
CREATE TABLE AddressLocations
(
    AddressLocationID INT IDENTITY(1,1) PRIMARY KEY,
    AddressLine1 VARCHAR(100) NOT NULL,
    AddressLine2 VARCHAR(100) NULL,
    CityAreaID INT FOREIGN KEY REFERENCES CityAreas(CityAreaID),
    PostCode VARCHAR(10) NULL
)
GO
CREATE TABLE CustomerTypes
(
    CustomerTypeID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerTypeCode VARCHAR(7) NOT NULL UNIQUE,
    CustomerTypeName VARCHAR(100) NOT NULL
)
GO
CREATE TABLE Customers
(
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerTypeID INT FOREIGN KEY REFERENCES CustomerTypes(CustomerTypeID),
    DefaultAddressID INT FOREIGN KEY REFERENCES AddressLocations(AddressLocationID),
    CustomerCode VARCHAR(7) NOT NULL UNIQUE,
    CustomerName VARCHAR(250) NOT NULL,
    CustomerContactNumber VARCHAR(30) NOT NULL,
    CustomerEmailAddress VARCHAR(250) NULL
)
GO
CREATE TABLE OrderStatus
(
    OrderStatusID INT IDENTITY(1,1) PRIMARY KEY,
    OrderstatusValue VARCHAR(20) NOT NULL
)
GO
CREATE TABLE InvoiceStatus
(
    InvoiceStatusID INT IDENTITY(1,1) PRIMARY KEY,
    InvoiceStatusValue VARCHAR(20) NOT NULL
)
GO
CREATE TABLE OrderHeaders
(
    OrderHeaderID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    AddressID INT FOREIGN KEY REFERENCES AddressLocations(AddressLocationID),
    OrderStatusID INT FOREIGN KEY REFERENCES OrderStatus(OrderStatusID),
    OrderDate DATETIME NOT NULL,
    DeliveryDate DATETIME NOT NULL
)
GO
CREATE TABLE OrderItems
(
    OrderItemID INT IDENTITY(1,1) PRIMARY KEY,
    OrderHeaderID INT FOREIGN KEY REFERENCES OrderHeaders(OrderHeaderID),
    ItemID INT FOREIGN KEY REFERENCES Items(ItemID),
    OrderItemStatusID INT FOREIGN KEY REFERENCES OrderStatus(OrderStatusID),
    OrderItemUnitPrice DECIMAL(12,4) NOT NULL,
    OrderItemUnitPriceAfterDiscount DECIMAL(12,4) NOT NULL,
    OrderItemQty INT NOT NULL,
    OrderItemDescription VARCHAR(100) NOT NULL
)
GO
CREATE TABLE InvoiceHeaders
(
    InvoiceHeaderID INT IDENTITY(1,1) PRIMARY KEY,
    OrderHeaderID INT FOREIGN KEY REFERENCES OrderHeaders(OrderHeaderID),
    InvoiceStatusID INT FOREIGN KEY REFERENCES InvoiceStatus(InvoiceStatusID),
    InvoiceDate DATETIME NOT NULL
)
GO
CREATE TABLE InvoiceItems
(
    InvoiceItemID INT IDENTITY(1,1) PRIMARY KEY,
    InvoiceHeaderID INT FOREIGN KEY REFERENCES InvoiceHeaders(InvoiceHeaderID),
    OrderItemID INT FOREIGN KEY REFERENCES OrderItems(OrderItemID),
    InvoiceItemStatusID INT FOREIGN KEY REFERENCES InvoiceStatus(InvoiceStatusID),
    InvoiceItemQty INT NOT NULL
)
GO
CREATE TABLE DeliveryNotes
(
    DeliveryNoteID INT IDENTITY(1,1) PRIMARY KEY,
    OrderHeaderID INT FOREIGN KEY REFERENCES OrderHeaders(OrderHeaderID),
    DeliveryDate DATETIME NOT NULL
)
CREATE TABLE DeliveryNoteItems
(
    DeliveryNoteItemID INT IDENTITY(1,1) PRIMARY KEY,
    DeliveryNoteID INT FOREIGN KEY REFERENCES DeliveryNotes(DeliveryNoteID),
    OrderItemID INT FOREIGN KEY REFERENCES OrderItems(OrderItemID)
)
CREATE TABLE AuditLogTypes
(
    AuditLogTypeID INT IDENTITY(1,1) PRIMARY KEY,
    AuditLogTypeName VARCHAR(100) NOT NULL
)
GO
CREATE TABLE AuditLogs
(
    AuditLogID INT IDENTITY(1,1) PRIMARY KEY,
    AuditLogTypeID INT FOREIGN KEY REFERENCES AuditLogTypes(AuditLogTypeID),
    AuditLogIdentifier INT NOT NULL,
    AuditLogIdentifierCode VARCHAR(5) NOT NULL,
    AuditLogOldValue VARCHAR(500),
    AuditLogNewValue VARCHAR(500),
    AuditLogDateChanged DATETIME NOT NULL,
    AuditLogChangedByID INT NOT NULL
)
GO
CREATE TABLE UserClaimTypes
(
    UserClaimTypeID INT IDENTITY(1,1) PRIMARY KEY,
    UserClaimTypeName VARCHAR(50) NOT NULL
)
GO
CREATE TABLE UserRoleTypes
(
    UserRoleTypeID INT IDENTITY(1,1) PRIMARY KEY,
    UserRoleName VARCHAR(100),
)
GO
CREATE TABLE Users
(
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(100) NOT NULL UNIQUE,
    EncryptedPassword VARCHAR(MAX) NOT NULL,
    KnownAs VARCHAR(100) NOT NULL,
    EmailAddress VARCHAR(150) NOT NULL UNIQUE,
)
GO
CREATE TABLE UserClaims
(
    UserClaimID INT IDENTITY(1,1) PRIMARY KEY,
    UserClaimTypeID INT FOREIGN KEY REFERENCES UserClaimTypes(UserClaimTypeID),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    ClaimValue VARCHAR(50)
)
GO
CREATE TABLE UserRoles
(
    UserRoleID INT IDENTITY(1,1) PRIMARY KEY,
    UserRoleTypeID INT FOREIGN KEY REFERENCES UserRoleTypes(UserRoleTypeID),
    UserID INT FOREIGN KEY REFERENCES Users(UserID)
)
GO
CREATE TABLE CustomerLogins
(
    CustomerLoginID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    UserID INT FOREIGN KEY REFERENCES Users(UserID)
)
GO
CREATE TABLE AuthorizedApplications
(
    AppID INT IDENTITY(1,1) PRIMARY KEY,
    AppName VARCHAR(100) NOT NULL,
    AppSecret VARCHAR(MAX) NOT NULL,
)
CREATE TABLE AccessKeys
(
    AccessKeyID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    AccessKey VARCHAR(MAX) NOT NULL,
    AccessKeyIssueDate DATETIME NOT NULL,
    AccessKeyExpiryDate DATETIME NOT NULL
)
CREATE TABLE RefreshTokens
(
    RefreshTokenID INT IDENTITY(1,1) PRIMARY KEY,
    AppID INT FOREIGN KEY REFERENCES AuthorizedApplications(AppID),
    RefreshToken VARCHAR(MAX) NOT NULL
)
GO
CREATE PROCEDURE dbo.DeliverExistingItems
    @OrderHeaderID INT
AS
IF EXISTS(SELECT 1
FROM OrderItems
WHERE OrderHeaderID = @OrderHeaderID and OrderItemStatusID = 1)
BEGIN
    INSERT INTO DeliveryNotes
        (OrderHeaderID,DeliveryDate)
    VALUES(@OrderHeaderID, GetDate())

    DECLARE @CurrentDeliveryNoteID INT
    SET @CurrentDeliveryNoteID = (SELECT TOP 1
        DeliveryNoteID
    FROM DeliveryNotes
    WHERE OrderHeaderID = @OrderHeaderID
    ORDER BY DeliveryNoteID DESC)

    INSERT INTO DeliveryNoteItems
        (DeliveryNoteID, OrderItemID)
    SELECT @CurrentDeliveryNoteID, OrderItemID
    FROM OrderItems
    WHERE OrderHeaderID = @OrderHeaderID
        AND OrderItemStatusID = 1

    UPDATE i
	SET i.ItemAvailableQty = i.ItemAvailableQty - oi.OrderItemQty
	FROM OrderItems oi
        INNER JOIN Items i on oi.ItemID = i.ItemID
	WHERE oi.OrderHeaderID = @OrderHeaderID
        AND oi.OrderItemStatusID = 1

    UPDATE OrderItems
	SET OrderItemStatusID = 2
	WHERE OrderHeaderID = @OrderHeaderID
        AND OrderItemStatusID = 1

    UPDATE OrderHeaders
	SET OrderStatusID = 2
	WHERE OrderHeaderID = @OrderHeaderID

    SELECT @CurrentDeliveryNoteID
END
ELSE
BEGIN
    SELECT 0
END
GO

CREATE PROCEDURE [dbo].[GenerateInvoiceForOrder]
    @OrderHeaderID INT
AS
IF EXISTS(SELECT 1
FROM OrderItems
WHERE OrderHeaderID = @OrderHeaderID and OrderItemStatusID = 2)
BEGIN
    INSERT INTO InvoiceHeaders
        (OrderHeaderID,InvoiceDate,InvoiceStatusID)
    VALUES(@OrderHeaderID, GetDate(), 1)

    DECLARE @CurrentInvoiceID INT
    SET @CurrentInvoiceID = (SELECT TOP 1
        InvoiceHeaderID
    FROM InvoiceHeaders
    WHERE OrderHeaderID = @OrderHeaderID
    ORDER BY InvoiceHeaderID DESC)

    INSERT INTO InvoiceItems
        (InvoiceHeaderID, OrderItemID, InvoiceItemStatusID, InvoiceItemQty)
    SELECT @CurrentInvoiceID, OrderItemID, 1, OrderItemQty
    FROM OrderItems
    WHERE OrderHeaderID = @OrderHeaderID
        AND OrderItemStatusID = 2

    UPDATE OrderItems
	SET OrderItemStatusID = 3
	WHERE OrderHeaderID = @OrderHeaderID
        AND OrderItemStatusID = 2

    UPDATE OrderHeaders
	SET OrderStatusID = 3
	WHERE OrderHeaderID = @OrderHeaderID

    SELECT @CurrentInvoiceID
END
ELSE
BEGIN
    SELECT 0
END
GO

CREATE PROCEDURE [dbo].AuthenticateUserAndGetExchangeKey
	@UsernameInput VARCHAR(100), @EncryptedPasswordInput VARCHAR(MAX)
AS
	DECLARE @UserID INT;
	DECLARE @AccessKeyGenerated VARCHAR(MAX);
	DECLARE @AccessKeyID INT
	SET @UserID = 0;
	SET @AccessKeyGenerated = '';
	SET @AccessKeyID = 0;

	IF EXISTS(
		SELECT 1
		FROM Users
		WHERE Username = @UsernameInput
		AND EncryptedPassword = @EncryptedPasswordInput
	)
	BEGIN
		SELECT @UserID = UserID
		FROM Users
		WHERE Username = @UsernameInput
		AND EncryptedPassword = @EncryptedPasswordInput
	
		INSERT INTO AccessKeys(UserID, AccessKey, AccessKeyIssueDate, AccessKeyExpiryDate)
		VALUES(@UserID, NewID(), GetDate(), DATEADD(MINUTE,1,GetDate()));
	
		SET @AccessKeyID = (SELECT SCOPE_IDENTITY());
		SET @AccessKeyGenerated = (SELECT AccessKey FROM AccessKeys WHERE AccessKeyID = @AccessKeyID);
	END
	ELSE
	BEGIN
		SET @AccessKeyGenerated = ''
	END

    SELECT @AccessKeyGenerated
GO

CREATE PROCEDURE [dbo].VerifyAccessKey
	@AccessKeyInput VARCHAR(MAX)
AS
	DECLARE @Success INT;
	SET @Success = 0;
	IF EXISTS(
		SELECT 1
		FROM AccessKeys
		WHERE AccessKey = @AccessKeyInput
		AND AccessKeyExpiryDate > GetDate()
	)
	BEGIN
		SET @Success = 1
	END
	ELSE
	BEGIN
		SET @Success = 0
	END

	SELECT @Success
GO