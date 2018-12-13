using Dapper;
using System;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class SecurityRepo : BaseRepo, ISecurityRepo
    {
        public SecurityRepo(IDbTransaction transaction) : base(transaction) { }

        public int CreateUser(UserEntity entityToCreate)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<UserClaimDTO> GetUserClaims(string username)
        {
            try
            {
                string query = @"
                SELECT usr.UserID, usr.Username, ct.UserClaimTypeName AS [ClaimType], uclaims.ClaimValue
                FROM Users usr
                INNER JOIN UserClaims uclaims on usr.UserID = uclaims.UserID
                INNER JOIN UserClaimTypes ct on ct.UserClaimTypeID = uclaims.UserClaimTypeID
                WHERE usr.Username = @Username
                ";
                return Connection.Query<UserClaimDTO>(query, new { Username = username} ,transaction: Transaction);
            }
            catch( Exception ex)
            {
                //TODO: LOG ERROR
                System.Console.WriteLine(ex.Message);
                return null;
            }
        }
        public UserLoginDTO GetUserLoginInfo(string username)
        {
            try
            {
                string query = @"
                SELECT UserID, Username, EmailAddress, EncryptedPassword
                FROM Users
                WHERE Username = @Username
                ";
                return Connection.QueryFirst<UserLoginDTO>(query, new { Username = username} ,transaction: Transaction);
            }
            catch ( Exception ex)
            {
                //TODO: LOG ERROR
                System.Console.WriteLine(ex.Message);
                return null;
            }
        }

    }
}