using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class CityRepo : BaseRepo, ICityRepo
    {
        public CityRepo(IDbTransaction transaction) : base(transaction) { }

        public int Create(CityCreateDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO Cities(CityCode, CityName, CountryID)
                VALUES (@CityCode, @CityName, @CountryID)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CityCode", entityToCreate.CityCode);
                queryParameters.Add("@CityName", entityToCreate.CityName);
                queryParameters.Add("@CountryID", entityToCreate.CountryID);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public CityDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT CityID,CityCode,CityName,ci.CountryID,
                    CONVERT(VARCHAR(10),co.CountryID) + ' - ' + co.CountryCode + ' - ' + co.CountryName AS [CountryText]
                FROM Cities ci WITH(NOLOCK)
                INNER JOIN Countries co WITH(NOLOCK) ON ci.CountryID= co.CountryID
                WHERE CityID = @CityID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CityID", id);

                return Connection.QueryFirst<CityDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<CityPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT CityID,CityCode,CityName,ci.CountryID
                FROM Cities ci WITH(NOLOCK)
                INNER JOIN Countries co WITH(NOLOCK) ON ci.CountryID= co.CountryID";

                return Connection.Query<CityPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public CityDTO Update(CityDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE Cities
                SET CityCode = @CityCode,
                CityName = @CityName,
                CountryID = @CountryID
                WHERE CityID = @CityID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CityCode", updatedRecord.CityCode);
                queryParameters.Add("@CityName", updatedRecord.CityName);
                queryParameters.Add("@CountryID", updatedRecord.CountryID);
                queryParameters.Add("@CityID", updatedRecord.CityID);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.CityID) : throw noRecordEX;          
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
                DELETE FROM Cities
                WHERE CityID = @CityID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CityID", id);

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