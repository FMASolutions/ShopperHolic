using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class CityAreaRepo : BaseRepo, ICityAreaRepo
    {
        public CityAreaRepo(IDbTransaction transaction) : base(transaction) { }
        
        public int Create(CityAreaCreateDTO entityToCreate)
        {
            throw new NotImplementedException();
        }
        public CityAreaDTO GetByID(int id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<CityAreaPreviewDTO> GetAllPreview()
        {
            throw new NotImplementedException();
        }
        public CityAreaDTO Update(CityAreaDTO updatedRecord)
        {
            throw new NotImplementedException();
        }
        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}