USE ShopperHolic
GO

ALTER TABLE Items 
ADD IsFeaturedItem BIT NOT NULL
CONSTRAINT DefaultFeaturedItem DEFAULT 0
WITH VALUES
GO

DROP TABLE PageInfo
DROP TABLE SiteConfig

CREATE TABLE PageInfo
(
    PageID INT IDENTITY(1,1) PRIMARY KEY,
    PageTitle VARCHAR(100) NOT NULL,
    PageDescription VARCHAR(MAX) NOT NULL,
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

