using Dapper;
using System;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;


namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class SecurityRepo : BaseRepo, ISecurityRepo
    {
        public SecurityRepo(IDbTransaction transaction) : base(transaction) { }


        public UserProfileDTO GetUserProfileDTO(string username)
        {
            try
            {
                string query = @"
                SELECT UserID, Username, EmailAddress, EncryptedPassword
                FROM Users WITH(NOLOCK)
                WHERE Username = @Username";
                
                return Connection.QueryFirst<UserProfileDTO>(query, new { Username = username }, CurrentTrans);
            }
            catch (Exception)
            {
                return null;
            }
        }
        public string AuthenticateUserAndGetExchangeKey(AttemptLoginDTO userInput, string encryptedPassword)
        {
            try
            {
                var spParameters = new DynamicParameters();
                spParameters.Add("@UsernameInput", userInput.Username);
                spParameters.Add("@EncryptedPasswordInput", encryptedPassword);
                return Connection.QueryFirst<string>("AuthenticateUserAndGetExchangeKey", spParameters, CurrentTrans, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
        public bool VerifyAccessKey(string accessKey)
        {
            try
            {
                var spParameters = new DynamicParameters();
                spParameters.Add("@AccessKeyInput", accessKey);
                return Connection.QueryFirst<bool>("VerifyAccessKey", spParameters, CurrentTrans, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                return false;
            }
        }
        public IEnumerable<UserClaimDTO> GetUserClaims(string username)
        {
            try
            {
                string query = @"
                SELECT ct.UserClaimTypeName AS [ClaimType], uclaims.ClaimValue
                FROM Users usr WITH(NOLOCK)
                INNER JOIN UserClaims uclaims WITH(NOLOCK) on usr.UserID = uclaims.UserID
                INNER JOIN UserClaimTypes ct WITH(NOLOCK) on ct.UserClaimTypeID = uclaims.UserClaimTypeID
                WHERE usr.Username = @Username";

                return Connection.Query<UserClaimDTO>(query, new { Username = username} , CurrentTrans);
            }
            catch( Exception)
            {
                return null;
            }
        }

        public string RetrieveValidToken(string username)
        {
            try
            {
                string query = @"
                SELECT TOP 1 t.Token
                FROM Users u WITH(NOLOCK)
                INNER JOIN Tokens t WITH(NOLOCK) ON u.UserID = t.UserID
                WHERE u.Username = @Username
                AND t.TokenExpiryDate > GetDate()
                ORDER BY t.TokenExpiryDate DESC";

                return Connection.QueryFirst<string>(query, new { Username = username }, CurrentTrans);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}