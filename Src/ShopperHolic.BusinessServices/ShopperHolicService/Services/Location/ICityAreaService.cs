using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface ICityAreaService : IDisposable
    {
        CityAreaDTO Create(CityAreaCreateDTO modelToCreate);
        CityAreaDTO GetByID(int id);
        IEnumerable<CityAreaPreviewDTO> GetAllPreview();
        CityAreaDTO Update(CityAreaDTO newModel);
        bool Delete(int id);
    }
}