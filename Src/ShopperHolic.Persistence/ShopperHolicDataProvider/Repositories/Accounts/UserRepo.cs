using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class UserRepo : BaseRepo, IUserRepo
    {
        public UserRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(UserCreateDTO entityToCreate, string encryptedPassword)
        {
            try
            {
                string query = @"
                INSERT INTO Users(Username, EncryptedPassword, KnownAs, EmailAddress,UserRoleTypeID)
                VALUES (@Username, @EncryptedPassword, @KnownAs,@EmailAddress, @UserRoleTypeID)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@Username", entityToCreate.Username);
                queryParameters.Add("@EncryptedPassword", encryptedPassword);
                queryParameters.Add("@KnownAs", entityToCreate.KnownAs);
                queryParameters.Add("@EmailAddress", entityToCreate.EmailAddress);
                queryParameters.Add("@UserRoleTypeID",entityToCreate.UserRoleTypeID);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public UserProfileDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT UserID, Username, EmailAddress, EncryptedPassword, KnownAs, UserRoleTypeID
                FROM Users
                WHERE UserID = @UserID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@UserID", id);

                return Connection.QueryFirst<UserProfileDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<UserPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT  UserID, Username, EmailAddress
                FROM Users";

                return Connection.Query<UserPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public UserProfileDTO Update(UserProfileDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE Users
                SET Username = @Username, 
                EncryptedPassword = @EncryptedPassword, 
                KnownAs = @KnownAs, 
                EmailAddress = @EmailAddress,
                UserRoleTypeID = @UserRoleTypeID
                WHERE UserID = @UserID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@Username", updatedRecord.Username);
                queryParameters.Add("@EncryptedPassword", updatedRecord.EncryptedPassword);
                queryParameters.Add("@KnownAs", updatedRecord.KnownAs);
                queryParameters.Add("@EmailAddress", updatedRecord.EmailAddress);
                queryParameters.Add("@UserID", updatedRecord.UserID);
                queryParameters.Add("@UserRoleTypeID", updatedRecord.UserRoleTypeID);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.UserID) : throw noRecordEX;
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
                DELETE FROM Users
                WHERE UserID = @UserID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@UserID", id);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<UserRoleTypeDTO> GetAvailableRoles()
        {
             try
            {
                string query = @"
                SELECT  UserRoleTypeID, UserRoleName
                FROM UserRoleTypes";

                return Connection.Query<UserRoleTypeDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<CustomerLoginDTO> GetLinkedCustomers(int userid)
        {
            try
            {
                string query = @"
                SELECT c.CustomerID, c.CustomerName, c.CustomerCode
                FROM Users u
                INNER JOIN CustomerLogins cl ON cl.UserID = u.UserID
                INNER JOIN Customers c ON c.CustomerID = cl.CustomerID
                WHERE u.UserID = @UserID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@UserID", userid);

                return Connection.Query<CustomerLoginDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<SupplierLoginDTO> GetLinkedSuppliers(int userid)
        {
            try
            {
                string query = @"
                SELECT s.SupplierID, s.SupplierName, s.SupplierCode
                FROM Users u
                INNER JOIN SupplierLogins sl ON sl.supplierID = u.UserID
                INNER JOIN Suppliers s ON s.SupplierID = sl.SupplierID
                WHERE u.UserID = @UserID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@UserID", userid);

                return Connection.Query<SupplierLoginDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}