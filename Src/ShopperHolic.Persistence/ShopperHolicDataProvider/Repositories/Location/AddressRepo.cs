using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class AddressRepo : BaseRepo, IAddressRepo
    {
        public AddressRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(AddressCreateDTO entityToCreate)
        {
            throw new NotImplementedException();
        }
        public AddressDTO GetByID(int id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<AddressPreviewDTO> GetAllPreview()
        {
            throw new NotImplementedException();
        }
        public AddressDTO Update(AddressDTO updatedRecord)
        {
            throw new NotImplementedException();
        }
        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}