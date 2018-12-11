using System.Collections.Generic;
namespace ShopperHolic.API.ShopperAPI.Models.Security
{
    public class AuthenticatedUserModel
    {
        public AuthenticatedUserModel()
        {
            IsAuthenticated = false;
            UserClaims = new List<UserClaim>();
        }
        public string Username {get;set;}
        public string BearerToken {get;set;}
        public bool IsAuthenticated {get;set;}
        public List<UserClaim> UserClaims {get;set;}
    }
}