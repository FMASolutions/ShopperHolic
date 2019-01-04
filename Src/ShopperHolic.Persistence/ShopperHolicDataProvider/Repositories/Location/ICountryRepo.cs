using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ICountryRepo
    {
        int Create(CountryCreateDTO entityToCreate);
        CountryDTO GetByID(int id);
        IEnumerable<CountryDTO> GetAll();
        CountryDTO Update(CountryDTO updatedRecord);
        bool Delete(int id);
    }
}