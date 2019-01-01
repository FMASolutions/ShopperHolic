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
    public class ProductGroupRepo : BaseRepo, IProductGroupRepo
    {
        //TODO Evaluate if I shoudl even have entites since im using DTO's????????
        public ProductGroupRepo(IDbTransaction transaction) : base(transaction) { }
        public int CreateProductGroup(ProductGroup entityToCreate)
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
                var newEx = SqlExceptionHandler.HandleSqlException(ex);
                if (newEx != null)
                    throw newEx;
                else
                    throw ex;
            }
        }

        public ProductGroupDTO GetProductGroupByID(int productGroupID)
        {
            try
            {
                string query = @"
                SELECT [ProductGroupID], [ProductGroupCode],[ProductGroupName],[ProductGroupDescription] 
                FROM ProductGroups 
                WHERE ProductGroupID = @ProductGroupID";

                return Connection.QueryFirst<ProductGroupDTO>(query, new { ProductGroupID = productGroupID }, transaction: Transaction);
            }
            catch (Exception ex)
            {
                var newEx = SqlExceptionHandler.HandleSqlException(ex);
                if (newEx != null)
                    throw newEx;
                else
                    throw ex;
            }

        }

        public IEnumerable<ProductGroupPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                    SELECT ProductGroupID, ProductGroupName, ProductGroupCode
                    FROM ProductGroups
                ";

                return Connection.Query<ProductGroupPreviewDTO>(query, transaction: Transaction);
            }
            catch (Exception ex)
            {
                var newEx = SqlExceptionHandler.HandleSqlException(ex);
                if (newEx != null)
                    throw newEx;
                else
                    throw ex;
            }
        }

        public ProductGroupDTO Update(ProductGroupDTO updatedProd)
        {
            try
            {
                ProductGroupDTO returnResult = null;
                string query = @"
                UPDATE ProductGroups
                SET ProductGroupCode = @ProductGroupCode
                ,ProductGroupName = @ProductGroupName
                ,ProductGroupDescription = @ProductGroupDescription
                WHERE ProductGroupID = @ProductGroupID
                ";
                var queryParams = new DynamicParameters();
                queryParams.Add("@ProductGroupID", updatedProd.ProductGroupID);
                queryParams.Add("@ProductGroupCode", updatedProd.ProductGroupCode);
                queryParams.Add("@ProductGroupName", updatedProd.ProductGroupName);
                queryParams.Add("@ProductGroupDescription", updatedProd.ProductGroupDescription);
                //TODO Change Execute to ASYNC
                int rowsEffected = Connection.Execute(query, queryParams, this.Transaction);
                if (rowsEffected > 0)
                    returnResult = updatedProd;
                return returnResult;
            }
            catch (Exception ex)
            {
                var newEx = SqlExceptionHandler.HandleSqlException(ex);
                if (newEx != null)
                    throw newEx;
                else
                    throw ex;
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
                int rowsEffected = Connection.Execute(query, new { ProductGroupID = id }, Transaction);
                if(rowsEffected >= 1)
                    return true;
                else
                    throw new System.InvalidOperationException("Sequence contains no elements");
            }
            catch (Exception ex)
            {
                var newEx = SqlExceptionHandler.HandleSqlException(ex);
                if (newEx != null)
                    throw newEx;
                else
                    throw ex;
            }
        }
    }
}