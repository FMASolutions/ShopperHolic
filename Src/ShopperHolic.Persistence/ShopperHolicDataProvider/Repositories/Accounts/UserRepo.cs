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
                DELETE FROM UserClaims
                WHERE UserID = @UserID
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
                INNER JOIN SupplierLogins sl ON sl.UserID = u.UserID
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

        public bool AddCustomerLogin(CustomerLoginDTO createEntity)
        {
            try
            {
                string query = @"
                INSERT INTO CustomerLogins(UserID, CustomerID)
                VALUES (@UserID, @CustomerID)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@UserID", createEntity.UserID);
                queryParameters.Add("@CustomerID", createEntity.CustomerID);

                var returnID = Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
                return returnID > 0;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public bool RemoveCustomerLogin(CustomerLoginDTO removeEntity)
        {
            try
            {
                string query = @"
                DELETE FROM CustomerLogins
                WHERE UserID = @UserID AND CustomerID = @CustomerID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@UserID", removeEntity.UserID);
                queryParameters.Add("@CustomerID", removeEntity.CustomerID);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public bool AddSupplierLogin(SupplierLoginDTO createEntity)
        {
            try
            {
                string query = @"
                INSERT INTO SupplierLogins(UserID, SupplierID)
                VALUES (@UserID, @SupplierID)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@UserID", createEntity.UserID);
                queryParameters.Add("@SupplierID", createEntity.SupplierID);

                var returnID = Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
                return returnID > 0;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public bool RemoveSupplierLogin(SupplierLoginDTO removeEntity)
        {
            try
            {
                string query = @"
                DELETE FROM SupplierLogins
                WHERE UserID = @UserID AND SupplierID = @SupplierID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@UserID", removeEntity.UserID);
                queryParameters.Add("@SupplierID", removeEntity.SupplierID);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public bool SetUserClaim(int userID, string claimType, string claimValue)
        {
            try
            {
                string query = @"
                UPDATE uc
                SET uc.ClaimValue = @ClaimValue
                FROM UserClaims uc
                INNER JOIN UserClaimTypes uct ON uct.UserClaimTypeID = uc.UserClaimTypeID
                INNER JOIN Users u on u.UserID = uc.UserID
                WHERE uct.UserClaimTypeName = @ClaimType
                AND u.UserID = @UserID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ClaimValue", claimValue);
                queryParameters.Add("@ClaimType", claimType);
                queryParameters.Add("@UserID", userID);

                return (Connection.Execute(query, queryParameters, CurrentTrans) > 0);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public bool ResetUserClaims(int userID)
        {
            try
            {
                string query = @"
                DELETE FROM UserClaims
                WHERE UserID = @UserID
                
                INSERT INTO UserClaims (UserClaimTypeID,UserID,ClaimValue)
                SELECT UserClaimTypeID, @UserID, 'false'
                FROM UserClaimTypes";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@UserID", userID);

                int rowsAffected = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsAffected > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}