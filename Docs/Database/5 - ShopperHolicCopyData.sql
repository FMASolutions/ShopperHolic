SET IDENTITY_INSERT ProductGroups ON
INSERT INTO ProductGroups(ProductGroupID ,ProductGroupCode ,ProductGroupName,ProductGroupDescription)
SELECT ProductGroupID ,ProductGroupCode ,ProductGroupName,ProductGroupDescription
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].ProductGroups
SET IDENTITY_INSERT ProductGroups OFF
GO


SET IDENTITY_INSERT SubGroups ON
INSERT INTO SubGroups(SubGroupID,    SubGroupCode,    ProductGroupID,    SubGroupName,    SubGroupDescription)
SELECT SubGroupID,    SubGroupCode,    ProductGroupID,    SubGroupName,    SubGroupDescription
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].SubGroups
SET IDENTITY_INSERT SubGroups OFF
GO



SET IDENTITY_INSERT Items ON
INSERT INTO Items(ItemID,ItemCode,SubGroupID,ItemName,ItemDescription,ItemUnitPrice,ItemUnitPriceWithMaxDiscount,ItemAvailableQty,ItemReorderQtyReminder,ItemImageFilename)
SELECT ItemID,ItemCode,SubGroupID,ItemName,ItemDescription,ItemUnitPrice,ItemUnitPriceWithMaxDiscount,ItemAvailableQty,ItemReorderQtyReminder,ItemImageFilename
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].Items
SET IDENTITY_INSERT Items OFF
GO

SET IDENTITY_INSERT Countries ON
INSERT INTO Countries(CountryID,CountryCode,CountryName)
SELECT CountryID,CountryCode,CountryName
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].Countries
SET IDENTITY_INSERT Countries OFF
GO


SET IDENTITY_INSERT Cities ON
INSERT INTO Cities(CityID,CityCode,CountryID,CityName )
SELECT CityID,CityCode,CountryID,CityName
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].Cities
SET IDENTITY_INSERT Cities OFF
GO

SET IDENTITY_INSERT CityAreas ON
INSERT INTO CityAreas(CityAreaID,CityAreaCode,CityID,CityAreaName)
SELECT CityAreaID,CityAreaCode,CityID,CityAreaName
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].CityAreas
SET IDENTITY_INSERT CityAreas OFF
GO

SET IDENTITY_INSERT AddressLocations ON
INSERT INTO AddressLocations(AddressLocationID,AddressLine1,AddressLine2,CityAreaID,PostCode)
SELECT AddressLocationID,AddressLine1,AddressLine2,CityAreaID,PostCode
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].AddressLocations
SET IDENTITY_INSERT AddressLocations OFF
GO

SET IDENTITY_INSERT Customers ON
INSERT INTO Customers(CustomerID,CustomerTypeID,CustomerCode,CustomerName,CustomerContactNumber,CustomerEmailAddress)
SELECT CustomerID,CustomerTypeID,CustomerCode,CustomerName,CustomerContactNumber,CustomerEmailAddress
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].Customers
SET IDENTITY_INSERT Customers OFF
GO


SET IDENTITY_INSERT OrderHeaders ON
INSERT INTO OrderHeaders(OrderHeaderID,CustomerID,OrderStatusID,OrderDate,DeliveryDate)
SELECT OrderHeaderID,CustomerID,OrderStatusID,OrderDate,DeliveryDate
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].OrderHeaders
SET IDENTITY_INSERT OrderHeaders OFF
GO


SET IDENTITY_INSERT OrderItems ON
INSERT INTO OrderItems(OrderItemID,OrderHeaderID,ItemID,OrderItemStatusID,OrderItemUnitPrice,OrderItemUnitPriceAfterDiscount,OrderItemQty,OrderItemDescription)
SELECT OrderItemID,OrderHeaderID,ItemID,OrderItemStatusID,OrderItemUnitPrice,OrderItemUnitPriceAfterDiscount,OrderItemQty,OrderItemDescription
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].OrderItems
SET IDENTITY_INSERT OrderItems OFF
GO

SET IDENTITY_INSERT InvoiceHeaders ON
INSERT INTO InvoiceHeaders(InvoiceHeaderID,OrderHeaderID,InvoiceStatusID,InvoiceDate)
SELECT InvoiceHeaderID,OrderHeaderID,InvoiceStatusID,InvoiceDate
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].InvoiceHeaders
SET IDENTITY_INSERT InvoiceHeaders OFF
GO

SET IDENTITY_INSERT InvoiceItems ON
INSERT INTO InvoiceItems(InvoiceItemID,InvoiceHeaderID,OrderItemID,InvoiceItemStatusID,InvoiceItemQty)
SELECT InvoiceItemID,InvoiceHeaderID,OrderItemID,InvoiceItemStatusID,InvoiceItemQty
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].InvoiceItems
SET IDENTITY_INSERT InvoiceItems OFF
GO

SET IDENTITY_INSERT DeliveryNotes ON
INSERT INTO DeliveryNotes(DeliveryNoteID,OrderHeaderID,DeliveryDate)
SELECT DeliveryNoteID,OrderHeaderID,DeliveryDate
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].DeliveryNotes
SET IDENTITY_INSERT DeliveryNotes OFF
GO

SET IDENTITY_INSERT DeliveryNoteItems ON
INSERT INTO DeliveryNoteItems(DeliveryNoteItemID,DeliveryNoteID,OrderItemID)
SELECT DeliveryNoteItemID,DeliveryNoteID,OrderItemID
FROM [FMASOLUTIONSDBINSTANCE.CKON4WS0G9YW.AP-SOUTH-1.RDS.AMAZONAWS.COM].[ShopBroDB].[dbo].DeliveryNoteItems
SET IDENTITY_INSERT DeliveryNoteItems OFF
GO