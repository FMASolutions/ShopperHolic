using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class UserRepo : BaseRepo, IUserRepo
    {
        public UserRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(UserCreateDTO entityToCreate)
        {
            throw new NotImplementedException();
        }
        public UserProfileDTO GetByID(int id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<UserPreviewDTO> GetAllPreview()
        {
            throw new NotImplementedException();
        }
        public UserProfileDTO Update(UserProfileDTO updatedRecord)
        {
            throw new NotImplementedException();
        }
        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}