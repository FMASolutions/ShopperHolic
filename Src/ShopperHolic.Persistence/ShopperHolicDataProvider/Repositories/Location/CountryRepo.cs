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

                return Connection.QueryFirst<int>(query, queryParameters, transaction: Transaction);
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

                return Connection.QueryFirst<CountryDTO>(query, queryParameters, transaction: Transaction);
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

                return Connection.Query<CountryDTO>(query, transaction: Transaction);
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

                var queryParams = new DynamicParameters();
                queryParams.Add("@CountryID", updatedRecord.CountryID);
                queryParams.Add("@CountryCode", updatedRecord.CountryCode);
                queryParams.Add("@CountryName", updatedRecord.CountryName);

                return (Connection.Execute(query, queryParams, base.Transaction) > 0) ? updatedRecord : throw base.noRecordEX;
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

                return (Connection.Execute(query, queryParameters, Transaction) > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}