using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class SupplierRepo : BaseRepo, ISupplierRepo
    {
        public SupplierRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(SupplierCreateDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO Suppliers(SupplierCode, SupplierName, SupplierContactNumber, SupplierEmailAddress)
                VALUES (@SupplierCode, @SupplierName, @SupplierContactNumber,@SupplierEmailAddress)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SupplierCode", entityToCreate.SupplierCode);
                queryParameters.Add("@SupplierName", entityToCreate.SupplierName);
                queryParameters.Add("@SupplierContactNumber", entityToCreate.SupplierContactNumber);
                queryParameters.Add("@SupplierEmailAddress", entityToCreate.SupplierEmailAddress);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public SupplierDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT SupplierID,SupplierCode,SupplierName,SupplierContactNumber,SupplierEmailAddress
                FROM Suppliers 
                WHERE SupplierID = @SupplierID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SupplierID", id);

                return Connection.QueryFirst<SupplierDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<SupplierPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT  SupplierID,SupplierCode,SupplierName,SupplierEmailAddress
                FROM Suppliers";

                return Connection.Query<SupplierPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public SupplierDTO Update(SupplierDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE Suppliers
                SET SupplierCode = @SupplierCode, 
                SupplierName = @SupplierName, 
                SupplierContactNumber = @SupplierContactNumber, 
                SupplierEmailAddress = @SupplierEmailAddress
                WHERE SupplierID = @SupplierID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SupplierCode", updatedRecord.SupplierCode);
                queryParameters.Add("@SupplierName", updatedRecord.SupplierName);
                queryParameters.Add("@SupplierContactNumber", updatedRecord.SupplierContactNumber);
                queryParameters.Add("@SupplierEmailAddress", updatedRecord.SupplierEmailAddress);
                queryParameters.Add("@SupplierID", updatedRecord.SupplierID);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.SupplierID) : throw noRecordEX;
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
                DELETE FROM Suppliers
                WHERE SupplierID = @SupplierID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@SupplierID", id);

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