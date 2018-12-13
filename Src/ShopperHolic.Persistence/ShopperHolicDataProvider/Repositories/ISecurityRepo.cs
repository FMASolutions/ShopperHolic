using System;
using System.Collections.Generic;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ISecurityRepo 
    {
        int CreateUser(UserEntity entityToCreate);
        IEnumerable<UserClaimDTO> GetUserClaims(string username);
        UserLoginDTO GetUserLoginInfo(string username);
    }
}