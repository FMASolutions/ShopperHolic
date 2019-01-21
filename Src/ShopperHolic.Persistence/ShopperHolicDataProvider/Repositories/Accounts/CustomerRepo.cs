using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class CustomerRepo : BaseRepo, ICustomerRepo
    {
        public CustomerRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(CustomerCreateDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO Customers(CustomerCode, CustomerContactNumber, CustomerEmailAddress, CustomerName, CustomerTypeID, DefaultAddressID)
                VALUES (@CustomerCode, @CustomerContactNumber, @CustomerEmailAddress,@CustomerName,@CustomerTypeID,@DefaultAddressID)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CustomerCode", entityToCreate.CustomerCode);
                queryParameters.Add("@CustomerContactNumber", entityToCreate.CustomerContactNumber);
                queryParameters.Add("@CustomerEmailAddress", entityToCreate.CustomerEmailAddress);
                queryParameters.Add("@CustomerName", entityToCreate.CustomerName);
                queryParameters.Add("@CustomerTypeID", entityToCreate.CustomerTypeID);
                queryParameters.Add("@DefaultAddressID", entityToCreate.DefaultAddressID);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public CustomerDTO GetByID(int id)
        {
            try
            {   //CONSIDER DEFAULTADDRESSTEXT BEING SENT BACK HERE.......
                string query = @"
                SELECT CustomerID,c.CustomerTypeID,CONVERT(VARCHAR(10),ct.CustomerTypeID)+ ' - ' + ct.CustomerTypeCode + ' - ' + ct.CustomerTypeName AS [CustomerTypeText],
                    DefaultAddressID,a.AddressLine1 + ' - ' + a.AddressLine2 + ' - ' +  ca.CityAreaName + ' - ' + ci.CityName AS DefaultAddressText,
                    CustomerCode,CustomerName,CustomerContactNumber,CustomerEmailAddress
                FROM Customers c
                INNER JOIN CustomerTypes ct on c.CustomerTypeID = ct.CustomerTypeID
                INNER JOIN AddressLocations a on c.DefaultAddressID = a.AddressLocationID
                INNER JOIN CityAreas ca on a.CityAreaID = ca.CityAreaID
                INNER JOIN Cities ci on ci.CityID = ca.CityID
                WHERE c.CustomerID = @CustomerID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CustomerID", id);

                return Connection.QueryFirst<CustomerDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<CustomerPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT CustomerID,CustomerCode,CustomerName, CustomerContactNumber
                FROM Customers c";

                return Connection.Query<CustomerPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public CustomerDTO Update(CustomerDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE Customers
                SET CustomerCode = @CustomerCode,
                CustomerContactNumber = @CustomerContactNumber,
                CustomerEmailAddress = @CustomerEmailAddress,
                CustomerName = @CustomerName,
                CustomerTypeID = @CustomerTypeID,
                DefaultAddressID = @DefaultAddressID
                WHERE CustomerID = @CustomerID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CustomerID", updatedRecord.CustomerID);
                queryParameters.Add("@CustomerCode", updatedRecord.CustomerCode);
                queryParameters.Add("@CustomerContactNumber", updatedRecord.CustomerContactNumber);
                queryParameters.Add("@CustomerEmailAddress", updatedRecord.CustomerEmailAddress);
                queryParameters.Add("@CustomerName", updatedRecord.CustomerName);
                queryParameters.Add("@CustomerTypeID", updatedRecord.CustomerTypeID);
                queryParameters.Add("@DefaultAddressID", updatedRecord.DefaultAddressID);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.CustomerID) : throw noRecordEX;
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
                DELETE FROM Customers
                WHERE CustomerID = @CustomerID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CustomerID", id);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<CustomerTypeDTO> GetCustomerTypes()
        {
            try
            {
                string query = @"
                SELECT CustomerTypeID, CustomerTypeName
                FROM CustomerTypes";

                return Connection.Query<CustomerTypeDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}