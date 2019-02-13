USE ShopperHolic
GO

ALTER TABLE OrderItems 
ADD TotalReturnedQty INT NOT NULL
CONSTRAINT DefaultReturnQty DEFAULT 0
WITH VALUES
GO


DROP TABLE CreditNoteItems
DROP TABLE CreditNotes
DROP TABLE ReturnNoteItems
DROP TABLE ReturnNotes
DROP TABLE RMAItems
DROP TABLE RMAHeaders
DROP TABLE RMAStatus
DROP TABLE CreditNoteStatus
DROP PROCEDURE dbo.ProcessReturn
DROP PROCEDURE dbo.CreditRMA


CREATE TABLE RMAStatus
(
    RMAStatusID INT IDENTITY(1,1) PRIMARY KEY,
    RMAStatusValue VARCHAR(20) NOT NULL
)
GO
CREATE TABLE CreditNoteStatus
(
    CreditNoteStatusID INT IDENTITY(1,1) PRIMARY KEY,
    CreditNoteStatusValue VARCHAR(20) NOT NULL
)
GO
CREATE TABLE RMAHeaders
(
    RMAHeaderID INT IDENTITY(1,1) PRIMARY KEY,    
    RMAStatusID INT FOREIGN KEY REFERENCES RMAStatus(RMAStatusID),
    OrderHeaderID INT FOREIGN KEY REFERENCES OrderHeaders(OrderHeaderID),
    CreatedDate DATETIME NOT NULL,
    ReturnedDate DATETIME NULL
)
GO
CREATE TABLE RMAItems
(
    RMAItemID INT IDENTITY(1,1) PRIMARY KEY,
    RMAHeaderID INT FOREIGN KEY REFERENCES RMAHeaders(RMAHeaderID),
    OrderItemID INT FOREIGN KEY REFERENCES OrderItems(OrderItemID),
    RMAItemStatusID INT FOREIGN KEY REFERENCES RMAStatus(RMAStatusID),
    ReturnQty INT NOT NULL,
    ReturnToInventory BIT NOT NULL,
    ReturnReason VARCHAR(200) NOT NULL
)
GO
CREATE TABLE CreditNotes
(
    CreditNoteID INT IDENTITY(1,1) PRIMARY KEY,
    RMAHeaderID INT FOREIGN KEY REFERENCES RMAHeaders(RMAHeaderID),
    CreditNoteStatusID INT FOREIGN KEY REFERENCES CreditNoteStatus(CreditNoteStatusID),
    CreditDate DATETIME NOT NULL
)
GO
CREATE TABLE CreditNoteItems
(
    CreditNoteItemID INT IDENTITY(1,1) PRIMARY KEY,
    CreditNoteID INT FOREIGN KEY REFERENCES CreditNotes(CreditNoteID),
    RMAItemID INT FOREIGN KEY REFERENCES RMAItems(RMAItemID),
    CreditNoteItemStatusID INT FOREIGN KEY REFERENCES CreditNoteStatus(CreditNoteStatusID),
)
GO
CREATE TABLE ReturnNotes
(
    ReturnNoteID INT IDENTITY(1,1) PRIMARY KEY,
    RMAHeaderID INT FOREIGN KEY REFERENCES RMAHeaders(RMAHeaderID),
    ReturnedDate DATETIME NOT NULL
)
CREATE TABLE ReturnNoteItems
(
    ReturnNoteItemID INT IDENTITY(1,1) PRIMARY KEY,
    ReturnNoteID INT FOREIGN KEY REFERENCES ReturnNotes(ReturnNoteID),
    RMAItemID INT FOREIGN KEY REFERENCES RMAItems(RMAItemID),
)


PRINT 'Insert Credit Note Status'
INSERT INTO CreditNoteStatus
    (CreditNoteStatusValue)
VALUES
    ('Generated'),
    ('Posted'),
    ('Complete')
GO

PRINT 'Insert RMA Status'
INSERT INTO RMAStatus
    (RMAStatusValue)
VALUES
    ('Raised'),
    ('Returned'),
    ('Complete')
GO 


/*-------------------------------------
ProcessReturn
-------------------------------------*/
CREATE PROCEDURE dbo.ProcessReturn
    @RMAHeaderID INT
AS
IF EXISTS(SELECT 1
FROM RMAItems
WHERE RMAHeaderID = @RMAHeaderID and RMAItemStatusID = 1)
BEGIN
    INSERT INTO ReturnNotes
        (RMAHeaderID,ReturnedDate)
    VALUES(@RMAHeaderID, GetDate())

    DECLARE @CurrentReturnNoteID INT
    SET @CurrentReturnNoteID = (SELECT TOP 1
        ReturnNoteID
    FROM ReturnNotes
    WHERE RMAHeaderID = @RMAHeaderID
    ORDER BY ReturnNoteID DESC)

    INSERT INTO ReturnNoteItems
        (ReturnNoteID, RMAItemID)
    SELECT @CurrentReturnNoteID, RMAItemID
    FROM RMAItems
    WHERE RMAHeaderID = @RMAHeaderID
        AND RMAItemStatusID = 1

    UPDATE i
	SET i.ItemAvailableQty = i.ItemAvailableQty + ri.ReturnQty
	FROM RMAItems ri
        INNER JOIN OrderItems oi ON oi.OrderItemID = ri.OrderItemID
        INNER JOIN Items i on oi.ItemID = i.ItemID
	WHERE ri.RMAHeaderID = @RMAHeaderID
        AND ri.RMAItemStatusID = 1
        AND ri.ReturnToInventory = 1 --ENSURE ONLY RETURN TO INVENTORY RETURNED ITEMS ARE RETURNED TO STOCK

    UPDATE oi
    SET oi.TotalReturnedQty = oi.TotalReturnedQty + ri.ReturnQty
    FROM OrderItems oi
    INNER JOIN RMAItems ri ON ri.OrderItemID = oi.OrderItemID
    WHERE ri.RMAHeaderID = @RMAHeaderID
    and ri.RMAItemStatusID = 1

    UPDATE RMAItems
	SET RMAItemStatusID = 2
	WHERE RMAHeaderID = @RMAHeaderID
        AND RMAItemStatusID = 1

    UPDATE RMAHeaders
	SET RMAStatusID = 2,
	ReturnedDate = GetDate()
	WHERE RMAHeaderID = @RMAHeaderID

    SELECT @CurrentReturnNoteID
END
ELSE
BEGIN
    SELECT 0
END
GO

/*-------------------------------------
CreditRMA
-------------------------------------*/
CREATE PROCEDURE [dbo].[CreditRMA]
    @RMAHeaderID INT
AS
IF EXISTS(SELECT 1
FROM RMAItems
WHERE RMAHeaderID = @RMAHeaderID and RMAItemStatusID = 2)
BEGIN
    INSERT INTO CreditNotes
        (RMAHeaderID,CreditNoteStatusID,CreditDate)
    VALUES(@RMAHeaderID, 1, GetDate())

    DECLARE @CurrentCreditNoteID INT
    SET @CurrentCreditNoteID = (SELECT TOP 1
        CreditNoteID
    FROM CreditNotes
    WHERE RMAHeaderID = @RMAHeaderID
    ORDER BY CreditNoteID DESC)

    INSERT INTO CreditNoteItems
        (CreditNoteID, RMAItemID, CreditNoteItemStatusID)
    SELECT @CurrentCreditNoteID, ri.RMAItemID , 1
    FROM RMAItems ri
    WHERE RMAHeaderID = @RMAHeaderID
        AND ri.RMAItemStatusID = 2

    UPDATE RMAItems
	SET RMAItemStatusID = 3
	WHERE RMAHeaderID = @RMAHeaderID
        AND RMAItemStatusID = 2

    UPDATE RMAHeaders
	SET RMAStatusID = 3
	WHERE RMAHeaderID = @RMAHeaderID

    SELECT @CurrentCreditNoteID
END
ELSE
BEGIN
    SELECT 0
END
GO


PRINT 'Insert NEW UserClaimTypes'
INSERT INTO UserClaimTypes
    (UserClaimTypeName)
VALUES
    ('UserCanProcessReturn'),
    ('UserCanCreditOrder'),
    ('UserCanDeleteRMA')

/* MANUALLY PROVIDE PERMISSIONS IMPORTANT */
/* MANUALLY PROVIDE PERMISSIONS IMPORTANT */
/* MANUALLY PROVIDE PERMISSIONS IMPORTANT */
/* MANUALLY PROVIDE PERMISSIONS IMPORTANT */
/* MANUALLY PROVIDE PERMISSIONS IMPORTANT */
/* MANUALLY PROVIDE PERMISSIONS IMPORTANT */
