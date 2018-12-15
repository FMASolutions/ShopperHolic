using System;
using Dapper;
using System.Data;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class ProductGroupRepo : BaseRepo, IProductGroupRepo
    {
        public ProductGroupRepo(IDbTransaction transaction) : base(transaction) { }
        public int CreateProductGroup(ProductGroup entityToCreate)
        {
            try
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
            catch (Exception ex)
            {
                //TODO: LOG ERROR
                System.Console.WriteLine(ex.Message);
                return 0;
            }
        }
    }
}