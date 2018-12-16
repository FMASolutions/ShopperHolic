using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class ProductGroupRepo : BaseRepo, IProductGroupRepo
    {
        public ProductGroupRepo(IDbTransaction transaction) : base(transaction) { }
        public int CreateProductGroup(ProductGroup entityToCreate)
        {
            var queryParameters = new DynamicParameters();
            string query = @"
                INSERT INTO ProductGroups(ProductGroupCode, ProductGroupName, ProductGroupDescription)
                VALUES (@ProdGroupCode, @ProdGroupName, @ProdGroupDescription)
                
                SELECT SCOPE_IDENTITY()
                ";

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

        public IEnumerable<ProductGroupPreviewDTO> GetAllProductGroupsPreview()
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
    }
}