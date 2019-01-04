using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    //TODO ADD WITH(NOLOCK) TO ALL READS!!!!!!
    public class ItemRepo : BaseRepo, IItemRepo
    {
        public ItemRepo(IDbTransaction transaction) : base(transaction) { }

        public int Create(Item entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO Items(ItemCode,SubGroupID,ItemName,ItemDescription,ItemUnitPrice,ItemUnitPriceWithMaxDiscount,ItemAvailableQty,ItemReorderQtyReminder,ItemImageFilename)
                VALUES (@ItemCode,@SubGroupID,@ItemName,@ItemDescription,@ItemUnitPrice,@ItemUnitPriceWithMaxDiscount,@ItemAvailableQty,@ItemReorderQtyReminder,@ItemImageFilename)
                
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

                return Connection.QueryFirst<int>(query, queryParameters, transaction: Transaction);
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
            }
        }
        public ItemDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT  ItemID ,ItemCode ,s.SubGroupID ,CONVERT(VARCHAR(10),s.SubGroupID) + ' - ' + s.SubGroupCode + ' - ' + s.SubGroupName AS [SubGroupText],
                    ItemName ,ItemDescription ,ItemUnitPrice ,ItemUnitPriceWithMaxDiscount ,ItemAvailableQty ,ItemReorderQtyReminder ,ItemImageFilename
                FROM Items I
                INNER JOIN SubGroups S ON I.SubGroupID = S.SubGroupID
                WHERE ItemID = @ItemID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ItemID", id);

                return Connection.QueryFirst<ItemDTO>(query, queryParameters, transaction: Transaction);
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
            }
        }
        public IEnumerable<ItemPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT  ItemID ,ItemCode, ItemName, ItemImageFilename, SubGroupID, ItemUnitPrice
                FROM Items I";

                return Connection.Query<ItemPreviewDTO>(query, transaction: Transaction);
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
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
                WHERE ItemID = @ItemID
                ";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ItemCode", updatedRecord.ItemCode);
                queryParameters.Add("@SubGroupID", updatedRecord.SubGroupID);
                queryParameters.Add("@ItemName", updatedRecord.ItemName);
                queryParameters.Add("@ItemDescription", updatedRecord.ItemDescription);
                queryParameters.Add("@ItemUnitPrice", updatedRecord.ItemUnitPrice);
                queryParameters.Add("@ItemUnitPriceWithMaxDiscount", updatedRecord.ItemUnitPriceWithMaxDiscount);
                queryParameters.Add("@ItemAvailableQty", updatedRecord.ItemAvailableQty);
                queryParameters.Add("@ItemReorderQtyReminder", updatedRecord.ItemReorderQtyReminder);
                queryParameters.Add("@ItemID", updatedRecord.ItemID);

                if (Connection.Execute(query, queryParameters, this.Transaction) > 0)
                    return updatedRecord;
                else
                    throw new System.InvalidOperationException("Sequence contains no elements");

            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
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

                return (Connection.Execute(query, queryParameters, Transaction) > 0) ? true : false;
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
            }
        }

        public bool UpdateImageNane(int id, string image)
        {
            try
            {
                string query = @"
                UPDATE Items
                SET ItemImageFilename = @ItemImageFilename
                WHERE ItemID = @ItemID
                ";
                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ItemID", id);
                queryParameters.Add("@ItemImagefilename", image);

                return (Connection.Execute(query, queryParameters, Transaction) > 0) ? true : false;
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
            }
        }

        public IEnumerable<ItemDetailedDTO> GetItemsInSubGroup(int subGroupID){
            try
            {
                string query = @"
                SELECT ItemID,ItemCode,ItemName,ItemDescription,ItemUnitPrice,ItemUnitPriceWithMaxDiscount,ItemAvailableQty,
                    ItemReorderQtyReminder,ItemImageFilename,S.SubGroupID,SubGroupCode,SubGroupName,SubGroupDescription,
                    P.ProductGroupID,ProductGroupCode,ProductGroupName,ProductGroupDescription
                FROM Items I
                INNER JOIN SubGroups S on S.SubGroupID = I.SubGroupID
                INNER JOIN ProductGroups P on P.ProductGroupID = S.ProductGroupID
                WHERE S.SubGroupID = @SubGroupID
                ";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SubGroupID", subGroupID);

                return Connection.Query<ItemDetailedDTO>(query, queryParameters, transaction: Transaction);
            }
            catch(Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
            }
        }
        public IEnumerable<ItemDetailedDTO> GetItemsInProductGroup(int productGroupID){
            try
            {
                string query = @"
                SELECT ItemID,ItemCode,ItemName,ItemDescription,ItemUnitPrice,ItemUnitPriceWithMaxDiscount,ItemAvailableQty,
                    ItemReorderQtyReminder,ItemImageFilename,S.SubGroupID,SubGroupCode,SubGroupName,SubGroupDescription,
                    P.ProductGroupID,ProductGroupCode,ProductGroupName,ProductGroupDescription
                FROM Items I
                INNER JOIN SubGroups S on S.SubGroupID = I.SubGroupID
                INNER JOIN ProductGroups P on P.ProductGroupID = S.ProductGroupID
                WHERE P.ProductGroupID = @ProductGroupID
                ";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ProductGroupID", productGroupID);

                return Connection.Query<ItemDetailedDTO>(query, queryParameters, transaction: Transaction);
            }
            catch(Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
            }
        }
    }
}