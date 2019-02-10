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
    ReturnedDate DATETIME NOT NULL
)
GO
CREATE TABLE RMAItems
(
    RMAItemID INT IDENTITY(1,1) PRIMARY KEY,
    RMAHeaderID INT FOREIGN KEY REFERENCES RMAHeaders(RMAHeaderID),
    OrderItemID INT FOREIGN KEY REFERENCES OrderItems(OrderItemID),
    RMAOrderItemStatus INT FOREIGN KEY REFERENCES RMAStatus(RMAStatusID),
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
    OrderItemID INT FOREIGN KEY REFERENCES OrderItems(OrderItemID),
    RMAItemID INT FOREIGN KEY REFERENCES RMAItems(RMAItemID),
    CreditNoteStatusID INT FOREIGN KEY REFERENCES CreditNoteStatus(CreditNoteStatusID),
    CreditQty INT NOT NULL
)
GO
CREATE TABLE ReturnNotes
(
    ReturnNoteID INT IDENTITY(1,1) PRIMARY KEY,
    RMAHeaderID INT FOREIGN KEY REFERENCES RMAHeaders(RMAHeaderID),
    RequestedDate DATETIME NOT NULL,
    ReturnedDate DATETIME NOT NULL
)
CREATE TABLE ReturnNoteItems
(
    ReturnNoteItemID INT IDENTITY(1,1) PRIMARY KEY,
    ReturnNoteID INT FOREIGN KEY REFERENCES ReturnNotes(ReturnNoteID),
    OrderItemID INT FOREIGN KEY REFERENCES OrderItems(OrderItemID),
    RMAItemID INT FOREIGN KEY REFERENCES RMAItems(RMAItemID),
    ReturnQty INT NOT NULL
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