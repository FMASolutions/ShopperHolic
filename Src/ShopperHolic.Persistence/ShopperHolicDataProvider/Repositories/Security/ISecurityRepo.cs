using System;
using System.Collections.Generic;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ISecurityRepo 
    {
        UserProfileDTO GetUserProfileDTO(string username);
        string AuthenticateUserAndGetExchangeKey(AttemptLoginDTO userInput);
        bool VerifyAccessKey(string accessKey);
        IEnumerable<UserClaimDTO> GetUserClaims(string username);
        string RetrieveValidToken(string username);
    }
}