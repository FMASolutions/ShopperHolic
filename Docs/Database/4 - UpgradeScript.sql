USE ShopperHolic
GO

ALTER TABLE Items 
ADD IsFeaturedItem BIT NOT NULL
CONSTRAINT DefaultFeaturedItem DEFAULT 0
WITH VALUES
GO

DROP TABLE PageInfo
DROP TABLE PageTypes
DROP TABLE SiteConfig

CREATE TABLE PageTypes
(
    PageTypeID INT IDENTITY(1,1) PRIMARY KEY,
    PageType VARCHAR(50)
)

CREATE TABLE PageInfo
(
    PageID INT IDENTITY(1,1) PRIMARY KEY,
    PageTypeID INT FOREIGN KEY REFERENCES PageTypes(PageTypeID),
    PageTitle VARCHAR(100) NOT NULL,
    PageDescription VARCHAR(MAX) NOT NULL,
    PageRoute VARCHAR(100) NOT NULL,
    IsHTML BIT NOT NULL
)
GO

CREATE TABLE SiteConfig
(
    SiteID INT IDENTITY(1,1) PRIMARY KEY,
    AppTitle VARCHAR(100) NOT NULL,
    AppShortName VARCHAR(50) NOT NULL,
    AppSlogan VARCHAR(200) NOT NULL,
    AppFooter VARCHAR(200) NOT NULL
)
GO

INSERT INTO PageTypes(PageType)
VALUES('Landing'),
('About'),
('Contact')
GO
INSERT INTO PageInfo(PageTypeID,PageTitle,PageDescription, PageRoute, IsHTML)
VALUES(1,'Landing Page Title','Landing Page Description','/home',0),
(2,'About Page Title','Contact Page Description','/about',0),
(3,'Contact Page Title','Contact Page Description','/contact',0)
GO

INSERT INTO SiteConfig(AppTitle,AppShortName,AppSlogan,AppFooter)
VALUES('Application Title!','S-Title','Catch App Slogan Here','App footer information here')
GO