using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class AddressRepo : BaseRepo, IAddressRepo
    {
        public AddressRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(AddressCreateDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO AddressLocations(AddressLine1, AddressLine2 , PostCode, CityAreaID)
                VALUES (@AddressLine1, @AddressLine2, @PostCode, @CityAreaID)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@AddressLine1", entityToCreate.AddressLine1);
                queryParameters.Add("@AddressLine2", entityToCreate.AddressLine2);
                queryParameters.Add("@PostCode", entityToCreate.PostCode);
                queryParameters.Add("@CityAreaID", entityToCreate.CityAreaID);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public AddressDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT AddressLocationID AS [AddressID],AddressLine1,AddressLine2,PostCode,ca.CityAreaID,
                    CONVERT(VARCHAR(10),ca.CityAreaID) + ' - ' + ca.CityAreaCode + ' - ' + ca.CityAreaName AS CityAreaText
                FROM AddressLocations al WITH(NOLOCK)
                INNER JOIN CityAreas ca WITH(NOLOCK) ON al.CityAreaID = ca.CityAreaID
                WHERE AddressLocationID = @AddressLocationID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@AddressLocationID", id);

                return Connection.QueryFirst<AddressDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<AddressPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT AddressLocationID AS [AddressID],AddressLine1,AddressLine2,PostCode,CityAreaName
                FROM AddressLocations al WITH(NOLOCK)
                INNER JOIN CityAreas ca WITH(NOLOCK) ON al.CityAreaID = ca.CityAreaID";

                return Connection.Query<AddressPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public AddressDTO Update(AddressDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE AddressLocations
                SET AddressLine1 = @AddressLine1
                ,AddressLine2 = @AddressLine2
                ,PostCode = @PostCode
                ,CityAreaID = @CityAreaID
                WHERE AddressLocationID = @AddressLocationID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@AddressLine1", updatedRecord.AddressLine1);
                queryParameters.Add("@AddressLine2", updatedRecord.AddressLine2);
                queryParameters.Add("@PostCode", updatedRecord.PostCode);
                queryParameters.Add("@CityAreaID", updatedRecord.CityAreaID);
                queryParameters.Add("@AddressLocationID", updatedRecord.AddressID);
                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.AddressID) : throw noRecordEX;
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
                DELETE FROM AddressLocations
                WHERE AddressLocationID = @AddressLocationID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@AddressLocationID", id);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public AddressDetailedDTO GetDetailedAddress(int addressID)
        {
            try
            {
                string query = @"
                SELECT AddressLocationID AS [AddressID], AddressLine1, AddressLine2
                    , ca.CityAreaName AS CityArea, c.CityName AS City, PostCode, co.CountryName AS [Country]
                FROM AddressLocations al WITH(NOLOCK)
                INNER JOIN CityAreas ca WITH(NOLOCK) ON al.CityAreaID = ca.CityAreaID
                INNER JOIN Cities c WITH(NOLOCK) ON ca.CityID = c.CityID
                INNER JOIN Countries co WITH(NOLOCK) ON c.CountryID = co.CountryID
                WHERE AddressLocationID = @AddressLocationID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@AddressLocationID", addressID);

                return Connection.QueryFirst<AddressDetailedDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}