using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class CityAreaRepo : BaseRepo, ICityAreaRepo
    {
        public CityAreaRepo(IDbTransaction transaction) : base(transaction) { }
        
        public int Create(CityAreaCreateDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO CityAreas(CityAreaCode, CityAreaName, CityID)
                VALUES (@CityAreaCode, @CityAreaName, @CityID)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CityAreaCode", entityToCreate.CityAreaCode);
                queryParameters.Add("@CityAreaName", entityToCreate.CityAreaName);
                queryParameters.Add("@CityID", entityToCreate.CityID);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public CityAreaDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT CityAreaID,CityAreaCode,CityAreaName,c.CityID,
                    CONVERT(VARCHAR(10),c.CityID) + ' - ' + c.CityCode + ' - ' + c.CityName AS CityText
                FROM CityAreas ca WITH(NOLOCK) 
                INNER JOIN Cities c WITH(NOLOCK) ON ca.CityID = c.CityID
                WHERE CityAreaID = @CityAreaID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CityAreaID", id);

                return Connection.QueryFirst<CityAreaDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<CityAreaPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT CityAreaID,CityAreaCode,CityAreaName,CityID
                FROM CityAreas ca WITH(NOLOCK) ";

                return Connection.Query<CityAreaPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public CityAreaDTO Update(CityAreaDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE CityAreas
                SET CityAreaCode = @CityAreaCode
                ,CityAreaName = @CityAreaName
                ,CityID = @CityID
                WHERE CityAreaID = @CityAreaID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CityID", updatedRecord.CityID);
                queryParameters.Add("@CityAreaID", updatedRecord.CityAreaID);
                queryParameters.Add("@CityAreaCode", updatedRecord.CityAreaCode);
                queryParameters.Add("@CityAreaName", updatedRecord.CityAreaName);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.CityAreaID) : throw noRecordEX;
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
                DELETE FROM CityAreas
                WHERE CityAreaID = @CityAreaID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CityAreaID", id);

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