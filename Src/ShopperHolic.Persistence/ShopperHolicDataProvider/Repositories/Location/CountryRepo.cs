using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class CountryRepo : BaseRepo, ICountryRepo
    {
        public CountryRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(CountryCreateDTO entityToCreate)
        {
            throw new NotImplementedException();
        }
        public CountryDTO GetByID(int id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<CountryDTO> GetAll()
        {
            throw new NotImplementedException();
        }
        public CountryDTO Update(CountryDTO updatedRecord)
        {
            throw new NotImplementedException();
        }
        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}