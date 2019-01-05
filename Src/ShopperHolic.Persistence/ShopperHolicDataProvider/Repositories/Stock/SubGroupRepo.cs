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
                queryParameters.Add("@ProductGroupID", entityToCreate.ProductGroupID);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
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

                return Connection.QueryFirst<SubGroupDTO>(query, queryParameters, CurrentTrans);
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

                return Connection.Query<SubGroupPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
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

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SubGroupID", updatedRecord.SubGroupID);
                queryParameters.Add("@ProductGroupID", updatedRecord.ProductGroupID);
                queryParameters.Add("@SubGroupCode", updatedRecord.SubGroupCode);
                queryParameters.Add("@SubGroupName", updatedRecord.SubGroupName);
                queryParameters.Add("@SubGroupDescription", updatedRecord.SubGroupDescription);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.SubGroupID) : throw noRecordEX;
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