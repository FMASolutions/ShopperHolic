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
    public class SubGroupRepo : BaseRepo, ISubGroupRepo
    {
        //TODO Evaluate if I shoudl even have entites since im using DTO's????????
        public SubGroupRepo(IDbTransaction transaction) : base(transaction) { }
        public int CreateSubGroup(SubGroup entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO SubGroups(SubGroupCode, SubGroupName, SubGroupDescription, ProductGroupID)
                VALUES (@SubGroupCode, @SubGroupName, @SubGroupDescription, @ProductGroupID)
                
                SELECT SCOPE_IDENTITY()
                ";
                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SubGroupCode", entityToCreate.SubGroupCode);
                queryParameters.Add("@SubGroupName", entityToCreate.SubGroupName);
                queryParameters.Add("@SubGroupDescription", entityToCreate.SubGroupDescription);
                queryParameters.Add("ProductGroupID", entityToCreate.ProductGroupID);

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

        public SubGroupDTO GetSubGroupByID(int subGroupID)
        {
            try
            {
                string query = @"
                SELECT [SubGroupID], [SubGroupCode],[SubGroupName],[SubGroupDescription],[ProductGroupID] 
                FROM SubGroups
                WHERE SubGroupID = @SubGroupID";

                return Connection.QueryFirst<SubGroupDTO>(query, new { SubGroupID = subGroupID }, transaction: Transaction);
            }
            catch (Exception ex)
            {
                Exception exToThrow = SqlExceptionHandler.HandleSqlException(ex) ?? ex;
                throw exToThrow;
            }

        }

        public IEnumerable<SubGroupPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                    SELECT SubGroupID, SubGroupName, SubGroupCode
                    FROM SubGroups
                ";

                return Connection.Query<SubGroupPreviewDTO>(query, transaction: Transaction);
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

        public SubGroupDTO Update(SubGroupDTO updatedSub)
        {
            try
            {
                string query = @"
                UPDATE SubGroups
                SET SubGroupCode = @SubGroupCode
                ,SubGroupName = @SubGroupName
                ,SubGroupDescription = @SubGroupDescription
                ,ProductGroupID = @ProductGroupID
                WHERE SubGroupID = @SubGroupID
                ";
                var queryParams = new DynamicParameters();
                queryParams.Add("@SubGroupID", updatedSub.SubGroupID);
                queryParams.Add("@ProductGroupID", updatedSub.ProductGroupID);
                queryParams.Add("@SubGroupCode", updatedSub.SubGroupCode);
                queryParams.Add("@SubGroupName", updatedSub.SubGroupName);
                queryParams.Add("@SubGroupDescription", updatedSub.SubGroupDescription);
                //TODO Change Execute to ASYNC
                int rowsEffected = Connection.Execute(query, queryParams, this.Transaction);
                if (rowsEffected > 0)
                    return updatedSub;
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

        public bool Delete(int id)
        {
            try
            {
                string query = @"
                DELETE FROM SubGroups
                WHERE SubGroupID = @SubGroupID
                ";
                int rowsEffected = Connection.Execute(query, new { SubGroupID = id }, Transaction);
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