using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface ISecurityService
    {
        string AttemptUserAuthenticationAndGetAccessKey(AttemptLoginDTO inputDTO);  
        bool VerifyAccessKey(string exchangeKey);       
        IEnumerable<UserClaimDTO> GetUserClaims(string username);
        bool StoreToken(TokenStorageDTO tokenToStore);
        UserProfileDTO GetUserProfile(string username);
    } 
}