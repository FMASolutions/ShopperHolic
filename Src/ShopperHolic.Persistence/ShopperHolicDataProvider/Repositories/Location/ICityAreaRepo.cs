using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ICityAreaRepo
    {
        int Create(CityAreaCreateDTO entityToCreate);
        CityAreaDTO GetByID(int id);
        IEnumerable<CityAreaPreviewDTO> GetAllPreview();
        CityAreaDTO Update(CityAreaDTO updatedRecord);
        bool Delete(int id);
    }
}