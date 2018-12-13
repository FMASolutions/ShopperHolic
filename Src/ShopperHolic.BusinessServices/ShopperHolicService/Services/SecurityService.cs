using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class SecurityService : BaseService, ISecurityService
    {
        public SecurityService(IUnitOfWork unitOfWork) : base(unitOfWork) { }
        public IEnumerable<UserClaimDTO> AttemptUserLogin(AttemptLoginDTO inputDTO)
        {
            IEnumerable<UserClaimDTO> returnValue = null;
            var searchResult = UOW.SecurityRepo.GetUserLoginInfo(inputDTO.Username);
            //TODO: ENCRYPT USER INPUT STRING TO ENCRYPTED PASSWORD
            if (searchResult != null)
                //TODO : COMPARE ENCRYPTED PASSWORD TO ENCRYPTED PASSWORD 
                if (inputDTO.UserInputPasswordPlainText == searchResult.EncryptedPassword)
                    returnValue = UOW.SecurityRepo.GetUserClaims(searchResult.Username);
            return returnValue;
        }
    }
}