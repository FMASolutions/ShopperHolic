using System.Collections.Generic;
namespace ShopperHolic.API.ShopperAPI.Models.Security
{
    //TDO: CHANGE THIS TO A DTO STILL ENSURING THE MAPPING TO THE ANGULAR UI AuthenticatedUser REMAINS
    public class AuthenticatedUserModel
    {
        public AuthenticatedUserModel()
        {
            IsAuthenticated = false;
            UserClaims = new List<UserClaim>();
        }
        public string Username { get; set; }
        public string BearerToken { get; set; }
        public bool IsAuthenticated { get; set; }
        public List<UserClaim> UserClaims { get; set; }
    }
}