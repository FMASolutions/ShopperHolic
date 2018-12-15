using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class SecurityService : BaseService, ISecurityService
    {
        public SecurityService(IUnitOfWork unitOfWork) : base(unitOfWork) { }
        public UserProfileDTO GetUserProfile(string username)
        {
            return UOW.SecurityRepo.GetUserProfileDTO(username);   
        }
        public string AttemptUserAuthenticationAndGetAccessKey(AttemptLoginDTO inputDTO)
        {
            string returnAccessKey = UOW.SecurityRepo.AuthenticateUserAndGetExchangeKey(inputDTO);
            if(!string.IsNullOrEmpty(returnAccessKey))
                UOW.SaveChanges();
            return returnAccessKey;
        }
        public bool VerifyAccessKey(string exchangeKey)
        {
            return UOW.SecurityRepo.VerifyAccessKey(exchangeKey);
        }
        public IEnumerable<UserClaimDTO> GetUserClaims(string username)
        {
            return UOW.SecurityRepo.GetUserClaims(username);
        }
    }
}