using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface ICityService : IDisposable
    {
        CityDTO Create(CityCreateDTO modelToCreate);
        CityDTO GetByID(int id);
        IEnumerable<CityPreviewDTO> GetAllPreview();
        CityDTO Update(CityDTO newModel);
        bool Delete(int id);
    }
}