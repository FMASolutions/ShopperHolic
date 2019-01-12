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
                INSERT INTO Users(Username, EncryptedPassword, KnownAs, EmailAddress)
                VALUES (@Username, @EncryptedPassword, @KnownAs,@EmailAddress)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@Username", entityToCreate.Username);
                queryParameters.Add("@EncryptedPassword", encryptedPassword);
                queryParameters.Add("@KnownAs", entityToCreate.KnownAs);
                queryParameters.Add("@EmailAddress", entityToCreate.EmailAddress);

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
                SELECT UserID, Username, EmailAddress, EncryptedPassword, KnownAs
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
                EmailAddress = @EmailAddress
                WHERE UserID = @UserID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@Username", updatedRecord.Username);
                queryParameters.Add("@EncryptedPassword", updatedRecord.EncryptedPassword);
                queryParameters.Add("@KnownAs", updatedRecord.KnownAs);
                queryParameters.Add("@EmailAddress", updatedRecord.EmailAddress);
                queryParameters.Add("@UserID", updatedRecord.UserID);

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
    }
}