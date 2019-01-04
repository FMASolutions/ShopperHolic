using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ICityRepo
    {
        int Create(CityCreateDTO entityToCreate);
        CityDTO GetByID(int id);
        IEnumerable<CityPreviewDTO> GetAllPreview();
        CityDTO Update(CityDTO updatedRecord);
        bool Delete(int id);
    }
}