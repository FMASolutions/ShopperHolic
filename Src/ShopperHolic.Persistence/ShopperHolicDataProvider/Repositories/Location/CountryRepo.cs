using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class CountryRepo : BaseRepo, ICountryRepo
    {
        public CountryRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(CountryCreateDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO Countries(CountryCode, CountryName)
                VALUES (@CountryCode, @CountryName)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CountryCode", entityToCreate.CountryCode);
                queryParameters.Add("@CountryName", entityToCreate.CountryName);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public CountryDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT CountryID, CountryCode, CountryName
                FROM Countries WITH(NOLOCK)
                WHERE CountryID = @CountryID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CountryID", id);

                return Connection.QueryFirst<CountryDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<CountryDTO> GetAll()
        {
            try
            {
                string query = @"
                SELECT CountryID, CountryCode, CountryName
                FROM Countries WITH(NOLOCK)";

                return Connection.Query<CountryDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public CountryDTO Update(CountryDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE Countries
                SET CountryCode = @CountryCode
                ,CountryName = @CountryName
                WHERE CountryID = @CountryID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CountryID", updatedRecord.CountryID);
                queryParameters.Add("@CountryCode", updatedRecord.CountryCode);
                queryParameters.Add("@CountryName", updatedRecord.CountryName);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.CountryID) : throw noRecordEX;
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
                DELETE FROM Countries
                WHERE CountryID = @CountryID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CountryID", id);

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