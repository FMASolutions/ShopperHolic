using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class ProductGroupRepo : BaseRepo, IProductGroupRepo
    {
        public ProductGroupRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(ProductGroupCreateDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO ProductGroups(ProductGroupCode, ProductGroupName, ProductGroupDescription)
                VALUES (@ProdGroupCode, @ProdGroupName, @ProdGroupDescription)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ProdGroupCode", entityToCreate.ProductGroupCode);
                queryParameters.Add("@ProdGroupName", entityToCreate.ProductGroupName);
                queryParameters.Add("@ProdGroupDescription", entityToCreate.ProductGroupDescription);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public ProductGroupDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT [ProductGroupID], [ProductGroupCode],[ProductGroupName],[ProductGroupDescription] 
                FROM ProductGroups WITH(NOLOCK)
                WHERE ProductGroupID = @ProductGroupID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ProductGroupID", id);

                return Connection.QueryFirst<ProductGroupDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }

        }

        public IEnumerable<ProductGroupPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT ProductGroupID, ProductGroupName, ProductGroupCode
                FROM ProductGroups WITH(NOLOCK)";

                return Connection.Query<ProductGroupPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public ProductGroupDTO Update(ProductGroupDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE ProductGroups
                SET ProductGroupCode = @ProductGroupCode
                ,ProductGroupName = @ProductGroupName
                ,ProductGroupDescription = @ProductGroupDescription
                WHERE ProductGroupID = @ProductGroupID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ProductGroupID", updatedRecord.ProductGroupID);
                queryParameters.Add("@ProductGroupCode", updatedRecord.ProductGroupCode);
                queryParameters.Add("@ProductGroupName", updatedRecord.ProductGroupName);
                queryParameters.Add("@ProductGroupDescription", updatedRecord.ProductGroupDescription);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.ProductGroupID) : throw noRecordEX;
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
                DELETE FROM ProductGroups
                WHERE ProductGroupID = @ProductGroupID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ProductGroupID", id);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}