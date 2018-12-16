using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    //TODO ADD WITH(NOLOCK) TO ALL READS!!!!!!
    public class ProductGroupRepo : BaseRepo, IProductGroupRepo
    {
        //TODO Evaluate if I shoudl even have entites since im using DTO's????????
        public ProductGroupRepo(IDbTransaction transaction) : base(transaction) { }
        public int CreateProductGroup(ProductGroup entityToCreate)
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
                //TODO LOG ERROR
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public IEnumerable<ProductGroupPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                    SELECT ProductGroupID, ProductGroupName, ProductGroupDescription
                    FROM ProductGroups
                ";

                return Connection.Query<ProductGroupPreviewDTO>(query, transaction: Transaction);
            }
            catch (Exception ex)
            {
                //TODO LOG ERROR
                Console.WriteLine(ex.Message);
                return null;
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
                queryParams.Add("@ProductGroupID",updatedProd.ProductGroupID);
                queryParams.Add("@ProductGroupCode",updatedProd.ProductGroupCode);
                queryParams.Add("@ProductGroupName",updatedProd.ProductGroupName);
                queryParams.Add("@ProductGroupDescription",updatedProd.ProductGroupDescription);
                //TODO Change Execute to ASYNC
                int rowsEffected = Connection.Execute(query,queryParams,this.Transaction);
                if(rowsEffected > 0)
                    returnResult = updatedProd;
                return returnResult;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                string query = @"
                DELETE FROM ProductGroups
                WHERE ProductGroupID = @ ProductGroupID
                ";
                int rowsEffected = Connection.Execute(query, new { ProductGroupID = id}, Transaction);
                return rowsEffected ==1;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}