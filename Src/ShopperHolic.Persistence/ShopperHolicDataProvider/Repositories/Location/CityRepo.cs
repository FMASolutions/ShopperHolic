using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class CityRepo : BaseRepo, ICityRepo
    {
        public CityRepo(IDbTransaction transaction) : base(transaction) { }

        public int Create(CityCreateDTO entityToCreate)
        {
            throw new NotImplementedException();
        }
        public CityDTO GetByID(int id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<CityPreviewDTO> GetAllPreview()
        {
            throw new NotImplementedException();
        }
        public CityDTO Update(CityDTO updatedRecord)
        {
            throw new NotImplementedException();
        }
        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}