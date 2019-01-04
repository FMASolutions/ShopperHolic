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
                
                SELECT SCOPE_IDENTITY()
                ";
                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ProdGroupCode", entityToCreate.ProductGroupCode);
                queryParameters.Add("@ProdGroupName", entityToCreate.ProductGroupName);
                queryParameters.Add("@ProdGroupDescription", entityToCreate.ProductGroupDescription);

                return Connection.QueryFirst<int>(query, queryParameters, transaction: Transaction);
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
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

                return Connection.QueryFirst<ProductGroupDTO>(query, queryParameters, transaction: Transaction);
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
            }

        }

        public IEnumerable<ProductGroupPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                    SELECT ProductGroupID, ProductGroupName, ProductGroupCode
                    FROM ProductGroups WITH(NOLOCK)
                ";

                return Connection.Query<ProductGroupPreviewDTO>(query, transaction: Transaction);
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
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
                WHERE ProductGroupID = @ProductGroupID
                ";
                var queryParams = new DynamicParameters();
                queryParams.Add("@ProductGroupID", updatedRecord.ProductGroupID);
                queryParams.Add("@ProductGroupCode", updatedRecord.ProductGroupCode);
                queryParams.Add("@ProductGroupName", updatedRecord.ProductGroupName);
                queryParams.Add("@ProductGroupDescription", updatedRecord.ProductGroupDescription);
                if (Connection.Execute(query, queryParams, this.Transaction) > 0)
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
                DELETE FROM ProductGroups
                WHERE ProductGroupID = @ProductGroupID
                ";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ProductGroupID", id);

                return (Connection.Execute(query, queryParameters, Transaction) > 0) ? true : false;
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
            }
        }
    }
}