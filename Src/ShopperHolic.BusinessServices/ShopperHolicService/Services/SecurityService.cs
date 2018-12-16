using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class SecurityService : BaseService, ISecurityService
    {
        public SecurityService(IUnitOfWork unitOfWork) : base(unitOfWork) { }
        public SecurityService(string connectionString) : base(connectionString) { }
        public UserProfileDTO GetUserProfile(string username)
        {
            return UOW.SecurityRepo.GetUserProfileDTO(username);
        }
        public string AttemptUserAuthenticationAndGetAccessKey(AttemptLoginDTO inputDTO)
        {
            string returnAccessKey = UOW.SecurityRepo.AuthenticateUserAndGetExchangeKey(inputDTO);
            if (!string.IsNullOrEmpty(returnAccessKey)) { UOW.SaveChanges(); }

            return returnAccessKey;
        }
        public bool VerifyAccessKey(string exchangeKey)
        {
            bool success = UOW.SecurityRepo.VerifyAccessKey(exchangeKey);
            if (success) { UOW.SaveChanges(); } //Save required due to deleting the access key on verification for security purposes.
            return success;
        }
        public IEnumerable<UserClaimDTO> GetUserClaims(string username)
        {
            return UOW.SecurityRepo.GetUserClaims(username);
        }
    }
}