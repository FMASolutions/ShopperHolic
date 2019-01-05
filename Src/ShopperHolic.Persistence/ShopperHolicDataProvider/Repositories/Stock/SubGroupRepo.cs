using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class SubGroupRepo : BaseRepo, ISubGroupRepo
    {
        public SubGroupRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(SubGroupCreateDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO SubGroups(SubGroupCode, SubGroupName, SubGroupDescription, ProductGroupID)
                VALUES (@SubGroupCode, @SubGroupName, @SubGroupDescription, @ProductGroupID)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SubGroupCode", entityToCreate.SubGroupCode);
                queryParameters.Add("@SubGroupName", entityToCreate.SubGroupName);
                queryParameters.Add("@SubGroupDescription", entityToCreate.SubGroupDescription);
                queryParameters.Add("ProductGroupID", entityToCreate.ProductGroupID);

                return Connection.QueryFirst<int>(query, queryParameters, transaction: Transaction);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public SubGroupDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT s.[SubGroupID], s.[SubGroupCode], s.[SubGroupName],s.[SubGroupDescription],s.[ProductGroupID]
                    ,CONVERT(VARCHAR(12),p.ProductGroupID) + ' - ' + p.ProductGroupCode + ' - ' + p.ProductGroupName AS [ProductGroupText]
                FROM SubGroups s WITH(NOLOCK)
                INNER JOIN ProductGroups p WITH(NOLOCK) ON s.ProductGroupID = p.ProductGroupID
                WHERE SubGroupID = @SubGroupID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SubGroupID", id);

                return Connection.QueryFirst<SubGroupDTO>(query,queryParameters, transaction: Transaction);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }

        }

        public IEnumerable<SubGroupPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                    SELECT SubGroupID, SubGroupName, SubGroupCode, ProductGroupID
                    FROM SubGroups WITH(NOLOCK)";

                return Connection.Query<SubGroupPreviewDTO>(query, transaction: Transaction);
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
            }
        }

        public SubGroupDTO Update(SubGroupDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE SubGroups
                SET SubGroupCode = @SubGroupCode
                ,SubGroupName = @SubGroupName
                ,SubGroupDescription = @SubGroupDescription
                ,ProductGroupID = @ProductGroupID
                WHERE SubGroupID = @SubGroupID";

                var queryParams = new DynamicParameters();
                queryParams.Add("@SubGroupID", updatedRecord.SubGroupID);
                queryParams.Add("@ProductGroupID", updatedRecord.ProductGroupID);
                queryParams.Add("@SubGroupCode", updatedRecord.SubGroupCode);
                queryParams.Add("@SubGroupName", updatedRecord.SubGroupName);
                queryParams.Add("@SubGroupDescription", updatedRecord.SubGroupDescription);

                if (Connection.Execute(query, queryParams, this.Transaction) > 0)
                    return updatedRecord;
                else
                    throw new System.InvalidOperationException("Sequence contains no elements");
                
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
                DELETE FROM SubGroups
                WHERE SubGroupID = @SubGroupID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SubGroupID", id);

                return (Connection.Execute(query, queryParameters, Transaction) > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}