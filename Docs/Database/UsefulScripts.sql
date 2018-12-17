USE ShopperHolic
GO

DECLARE @LoopCounter INT
DECLARE @NumLoops INT
DECLARE @CurrentCode VARCHAR(7)
DECLARE @CodePrevix VARCHAR(1)

SET @LoopCounter = 0
SET @NumLoops = 3500
SET @CodePrevix = 'A'
SET @CurrentCode = CONCAT(@CodePrevix, @LoopCounter)



WHILE(@LoopCounter <= @NumLoops)
BEGIN
	INSERT INTO ProductGroups(ProductGroupCode,ProductGroupName,ProductGroupDescription)
	VALUES(@CurrentCode,'Random Name','Random Description')
	PRINT @CurrentCode
	SET @LoopCounter = @LoopCounter + 1
	SET @CurrentCode = CONCAT(@CodePrevix, @LoopCounter)
END