
USE ShopperHolic
GO

DROP PROCEDURE dbo.DeliverExistingItems
DROP PROCEDURE dbo.GenerateInvoiceForOrder
DROP PROCEDURE dbo.AuthenticateUserAndGetExchangeKey
DROP PROCEDURE dbo.VerifyAccessKey
DROP PROCEDURE dbo.SendPurchaseOrder
DROP PROCEDURE dbo.ProcessGoodsReceived
DROP PROCEDURE dbo.GeneratePuchaseInvoice
DROP PROCEDURE dbo.CreateNewUser
GO

/*-------------------------------------
DeliveryExistingItems
-------------------------------------*/
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

/*-------------------------------------
GenerateInvoiceForOrder
-------------------------------------*/
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

/*-------------------------------------
SendPurchaseOrder
-------------------------------------*/
CREATE PROCEDURE [dbo].[SendPurchaseOrder]
    @PurchaseOrderHeaderID INT
AS
IF EXISTS(SELECT 1
FROM PurchaseOrderItems
WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID and PurchaseOrderItemStatusID = 1)
BEGIN
    UPDATE PurchaseOrderItems
	SET PurchaseOrderItemStatusID = 2
	WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID
        AND PurchaseOrderItemStatusID = 1

    UPDATE PurchaseOrderHeaders
	SET PurchaseOrderStatusID = 2
	WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID
    SELECT 1
END
ELSE
BEGIN
    SELECT 0
END
GO

/*-------------------------------------
ProcessGoodsReceived
-------------------------------------*/
CREATE PROCEDURE [dbo].[ProcessGoodsReceived]
    @PurchaseOrderHeaderID INT
AS
IF EXISTS(SELECT 1
FROM PurchaseOrderItems
WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID and PurchaseOrderItemStatusID = 2)
BEGIN

    INSERT INTO GoodsReceivedNotes
        (PurchaseOrderHeaderID,GoodsReceivedDate)
    VALUES(@PurchaseOrderHeaderID, GetDate())

    DECLARE @CurrentGoodsReceivedNoteID INT
    SET @CurrentGoodsReceivedNoteID = (
        SELECT TOP 1 GoodsReceivedNoteID
        FROM GoodsReceivedNotes
        WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID
        ORDER BY GoodsReceivedNoteID DESC
    )

    INSERT INTO GoodsReceivedNoteItems
        (GoodsReceivedNoteID, PurchaseOrderItemID)
    SELECT @CurrentGoodsReceivedNoteID, PurchaseOrderItemID
    FROM PurchaseOrderItems
    WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID
        AND PurchaseOrderItemStatusID = 2

    UPDATE i
	SET i.ItemAvailableQty = i.ItemAvailableQty + poi.OrderItemQty
	FROM PurchaseOrderItems poi
    INNER JOIN Items i on poi.ItemID = i.ItemID
	WHERE poi.PurchaseOrderHeaderID = @PurchaseOrderHeaderID
        AND poi.PurchaseOrderItemStatusID = 2

    UPDATE PurchaseOrderItems
	SET PurchaseOrderItemStatusID = 3
	WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID
        AND PurchaseOrderItemStatusID = 2

    UPDATE PurchaseOrderHeaders
	SET PurchaseOrderStatusID = 3
	WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID
    
    SELECT @CurrentGoodsReceivedNoteID
END
ELSE
BEGIN
    SELECT 0
END
GO

/*-------------------------------------
GeneratePuchaseInvoice
-------------------------------------*/
CREATE PROCEDURE [dbo].[GeneratePuchaseInvoice]
    @PurchaseOrderHeaderID INT
AS
IF EXISTS(SELECT 1
FROM PurchaseOrderItems
WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID and PurchaseOrderItemStatusID = 3)
BEGIN

    INSERT INTO PurchaseInvoiceHeaders
        (PurchaseOrderHeaderID,InvoiceDate,PurchaseInvoiceStatusID)
    VALUES(@PurchaseOrderHeaderID, GetDate(), 1)

    DECLARE @CurrentPurchaseInvoiceID INT
    SET @CurrentPurchaseInvoiceID = (SELECT TOP 1
        PurchaseInvoiceHeaderID
    FROM PurchaseInvoiceHeaders
    WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID
    ORDER BY PurchaseInvoiceHeaderID DESC)

    INSERT INTO PurchaseInvoiceItems
        (PurchaseInvoiceHeaderID, PurchaseOrderItemID, PurchaseInvoiceItemStatusID, InvoiceItemQty)
    SELECT @CurrentPurchaseInvoiceID, PurchaseOrderItemID, 1, OrderItemQty
    FROM PurchaseOrderItems
    WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID
        AND PurchaseOrderItemStatusID = 3

    UPDATE PurchaseOrderItems
	SET PurchaseOrderItemStatusID = 4
	WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID
        AND PurchaseOrderItemStatusID = 3

    UPDATE PurchaseOrderHeaders
	SET PurchaseOrderStatusID = 4
	WHERE PurchaseOrderHeaderID = @PurchaseOrderHeaderID
    SELECT @CurrentPurchaseInvoiceID
END
ELSE
BEGIN
    SELECT 0
END
GO

/*-------------------------------------
AuthenticateUserAndGetExchangeKey
-------------------------------------*/
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

/*-------------------------------------
VerifyAccessKey
-------------------------------------*/
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
        DELETE FROM AccessKeys 
        WHERE AccessKey = @AccessKeyInput
	END
	ELSE
	BEGIN
		SET @Success = 0
	END

	SELECT @Success
GO



/*-------------------------------------
CreateNewUser
-------------------------------------*/
CREATE PROCEDURE [dbo].CreateNewUser
	@Username VARCHAR(100),
    @EncryptedPassword VARCHAR(MAX),
    @KnownAs VARCHAR(100),
    @EmailAddress VARCHAR(150),
    @UserRoleTypeID INT
AS
	DECLARE @Success INT;
	SET @Success = 0;
	
    INSERT INTO Users(Username, EncryptedPassword, KnownAs, EmailAddress)
    VALUES(@Username, @EncryptedPassword, @KnownAs, @EmailAddress)

    DECLARE @NewUserID INT
    SET @NewUserID = (
        SELECT UserID 
        FROM USERS 
        WHERE Username = @Username AND EncryptedPassword = @EncryptedPassword
    )

    INSERT INTO UserRoles(UserRoleTypeID,UserID)
    VALUES(@UserRoleTypeID, @NewUserID)

    INSERT INTO UserClaims (UserClaimTypeID,UserID,ClaimValue)
    SELECT UserClaimTypeID, @NewUserID, 'false'
    FROM UserClaimTypes

    IF(@UserRoleTypeID = 1) --ADMIN USER set everything to true
    BEGIN
        UPDATE UserClaims
        SET ClaimValue = 'true'
        WHERE UserID = @NewUserID
    END
    ELSE IF(@UserRoleTypeID = 2) -- Customer, only allowed to create address
    BEGIN
        UPDATE c 
        SET c.ClaimValue = 'true'
        FROM UserClaims c
        INNER JOIN UserClaimTypes ct on c.UserClaimTypeID = ct.UserClaimTypeID
        WHERE c.UserID = @NewUserID
        AND ct.UserClaimTypeName = 'UserCanCreateAddress' 
    END
GO
