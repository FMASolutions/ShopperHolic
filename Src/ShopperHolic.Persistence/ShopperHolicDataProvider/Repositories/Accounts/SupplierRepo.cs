using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class SupplierRepo : BaseRepo, ISupplierRepo
    {
        public SupplierRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(SupplierCreateDTO entityToCreate)
        {
            throw new NotImplementedException();
        }
        public SupplierDTO GetByID(int id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<SupplierPreviewDTO> GetAllPreview()
        {
            throw new NotImplementedException();
        }
        public SupplierDTO Update(SupplierDTO updatedRecord)
        {
            throw new NotImplementedException();
        }
        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}