using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface ISecurityService
    {
        IEnumerable<UserClaimDTO> AttemptUserLogin(AttemptLoginDTO inputDTO);  
    } 
}