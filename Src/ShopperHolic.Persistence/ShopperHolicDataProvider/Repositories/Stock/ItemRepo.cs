using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class ItemRepo : BaseRepo, IItemRepo
    {
        public ItemRepo(IDbTransaction transaction) : base(transaction) { }

        public int Create(ItemCreateDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO Items(ItemCode,SubGroupID,ItemName,ItemDescription,ItemUnitPrice,ItemUnitPriceWithMaxDiscount,ItemAvailableQty,ItemReorderQtyReminder,ItemImageFilename,IsFeaturedItem)
                VALUES (@ItemCode,@SubGroupID,@ItemName,@ItemDescription,@ItemUnitPrice,@ItemUnitPriceWithMaxDiscount,@ItemAvailableQty,@ItemReorderQtyReminder,@ItemImageFilename,@IsFeaturedItem)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ItemCode", entityToCreate.ItemCode);
                queryParameters.Add("@SubGroupID", entityToCreate.SubGroupID);
                queryParameters.Add("@ItemName", entityToCreate.ItemName);
                queryParameters.Add("@ItemDescription", entityToCreate.ItemDescription);
                queryParameters.Add("@ItemUnitPrice", entityToCreate.ItemUnitPrice);
                queryParameters.Add("@ItemUnitPriceWithMaxDiscount", entityToCreate.ItemUnitPriceWithMaxDiscount);
                queryParameters.Add("@ItemAvailableQty", entityToCreate.ItemAvailableQty);
                queryParameters.Add("@ItemReorderQtyReminder", entityToCreate.ItemReorderQtyReminder);
                queryParameters.Add("@ItemImageFilename", ""); //Set Image to empty as this is available through the image update function.
                queryParameters.Add("@IsFeaturedItem", entityToCreate.IsFeaturedItem ? 1 : 0);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public ItemDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT  ItemID ,ItemCode ,s.SubGroupID ,CONVERT(VARCHAR(10),s.SubGroupID) + ' - ' + s.SubGroupCode + ' - ' + s.SubGroupName AS [SubGroupText],
                    ItemName ,ItemDescription ,ItemUnitPrice ,ItemUnitPriceWithMaxDiscount ,ItemAvailableQty ,ItemReorderQtyReminder ,ItemImageFilename, IsFeaturedItem
                FROM Items I WITH(NOLOCK)
                INNER JOIN SubGroups S WITH(NOLOCK) ON I.SubGroupID = S.SubGroupID
                WHERE ItemID = @ItemID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ItemID", id);

                return Connection.QueryFirst<ItemDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<ItemPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT  ItemID ,ItemCode, ItemName, ItemImageFilename, SubGroupID, ItemUnitPrice, IsFeaturedItem
                FROM Items I WITH(NOLOCK)";

                return Connection.Query<ItemPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public ItemDTO Update(ItemDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE Items
                SET ItemCode = @ItemCode
                ,SubGroupID = @SubGroupID
                ,ItemName = @ItemName
                ,ItemDescription = @ItemDescription
                ,ItemUnitPrice = @ItemUnitPrice
                ,ItemUnitPriceWithMaxDiscount = @ItemUnitPriceWithMaxDiscount
                ,ItemAvailableQty = @ItemAvailableQty
                ,ItemReorderQtyReminder = ItemReorderQtyReminder
                ,IsFeaturedItem = @IsFeaturedItem
                WHERE ItemID = @ItemID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ItemCode", updatedRecord.ItemCode);
                queryParameters.Add("@SubGroupID", updatedRecord.SubGroupID);
                queryParameters.Add("@ItemName", updatedRecord.ItemName);
                queryParameters.Add("@ItemDescription", updatedRecord.ItemDescription);
                queryParameters.Add("@ItemUnitPrice", updatedRecord.ItemUnitPrice);
                queryParameters.Add("@ItemUnitPriceWithMaxDiscount", updatedRecord.ItemUnitPriceWithMaxDiscount);
                queryParameters.Add("@ItemAvailableQty", updatedRecord.ItemAvailableQty);
                queryParameters.Add("@ItemReorderQtyReminder", updatedRecord.ItemReorderQtyReminder);
                queryParameters.Add("@IsFeaturedItem", updatedRecord.IsFeaturedItem ? 1: 0);
                queryParameters.Add("@ItemID", updatedRecord.ItemID);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.ItemID) : throw noRecordEX;

            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public bool Delete(int id)
        {
            try
            {
                string query = @"
                DELETE FROM Items
                WHERE ItemID = @ItemID
                ";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ItemID", id);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public bool UpdateImageNane(int id, string image)
        {
            try
            {
                string query = @"
                UPDATE Items
                SET ItemImageFilename = @ItemImageFilename
                WHERE ItemID = @ItemID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ItemID", id);
                queryParameters.Add("@ItemImagefilename", image);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<ItemDetailedDTO> GetItemsInSubGroup(int subGroupID){
            try
            {
                string query = @"
                SELECT ItemID,ItemCode,ItemName,ItemDescription,ItemUnitPrice,ItemUnitPriceWithMaxDiscount,ItemAvailableQty,
                    ItemReorderQtyReminder,ItemImageFilename,S.SubGroupID,SubGroupCode,SubGroupName,SubGroupDescription,
                    P.ProductGroupID,ProductGroupCode,ProductGroupName,ProductGroupDescription, I.IsFeaturedItem
                FROM Items I WITH(NOLOCK)
                INNER JOIN SubGroups S WITH(NOLOCK) on S.SubGroupID = I.SubGroupID
                INNER JOIN ProductGroups P WITH(NOLOCK) on P.ProductGroupID = S.ProductGroupID
                WHERE S.SubGroupID = @SubGroupID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SubGroupID", subGroupID);

                return Connection.Query<ItemDetailedDTO>(query, queryParameters, CurrentTrans);
            }
            catch(Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<ItemDetailedDTO> GetItemsInProductGroup(int productGroupID){
            try
            {
                string query = @"
                SELECT ItemID,ItemCode,ItemName,ItemDescription,ItemUnitPrice,ItemUnitPriceWithMaxDiscount,ItemAvailableQty,
                    ItemReorderQtyReminder,ItemImageFilename,S.SubGroupID,SubGroupCode,SubGroupName,SubGroupDescription,
                    P.ProductGroupID,ProductGroupCode,ProductGroupName,ProductGroupDescription, I.IsFeaturedItem
                FROM Items I WITH(NOLOCK)
                INNER JOIN SubGroups S WITH(NOLOCK) on S.SubGroupID = I.SubGroupID
                INNER JOIN ProductGroups P WITH(NOLOCK) on P.ProductGroupID = S.ProductGroupID
                WHERE P.ProductGroupID = @ProductGroupID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ProductGroupID", productGroupID);

                return Connection.Query<ItemDetailedDTO>(query, queryParameters, CurrentTrans);
            }
            catch(Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}