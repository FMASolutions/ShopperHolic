using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class CustomerRepo : BaseRepo, ICustomerRepo
    {
        public CustomerRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(CustomerCreateDTO entityToCreate)
        {
            throw new NotImplementedException();
        }
        public CustomerDTO GetByID(int id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<CustomerPreviewDTO> GetAllPreview()
        {
            throw new NotImplementedException();
        }
        public CustomerDTO Update(CustomerDTO updatedRecord)
        {
            throw new NotImplementedException();
        }
        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}