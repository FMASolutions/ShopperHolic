using System.Collections.Generic;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    //TDO: CHANGE THIS TO A DTO STILL ENSURING THE MAPPING TO THE ANGULAR UI AuthenticatedUser REMAINS
    public class AuthenticatedUserDTO
    {
        public AuthenticatedUserDTO()
        {
            UserClaims = new List<UserClaimDTO>();
            IsAuthenticated = false;
        }
        public string Username { get; set; }
        public string BearerToken { get; set; }
        public bool IsAuthenticated { get; set; }
        public List<UserClaimDTO> UserClaims { get; set; }
    }
}