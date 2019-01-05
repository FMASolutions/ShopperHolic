using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface ICountryService : IDisposable
    {
        CountryDTO Create(CountryCreateDTO modelToCreate);
        CountryDTO GetByID(int id);
        IEnumerable<CountryDTO> GetAll();
        CountryDTO Update(CountryDTO newModel);
        bool Delete(int id);
    }
}