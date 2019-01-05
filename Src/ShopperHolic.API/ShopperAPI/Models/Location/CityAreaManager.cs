using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class CityAreaManager : IDisposable
    {
        public CityAreaManager(ICityAreaService service)
        {
            _cityAreaService = service;
        }

        public void Dispose()
        {
            _cityAreaService.Dispose();
        }

        private ICityAreaService _cityAreaService;

        public CityAreaDTO Create(CityAreaCreateDTO createModel)
        {
            return _cityAreaService.Create(createModel);
        }
        public CityAreaDTO GetyByID(int id)
        {
            return _cityAreaService.GetByID(id);
        }

        public List<CityAreaPreviewDTO> GetAllPreview()
        {
            var returnList = new List<CityAreaPreviewDTO>();
            foreach(var current in _cityAreaService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public CityAreaDTO Update(CityAreaDTO newModel)
        {
            return _cityAreaService.Update(newModel);
        }

        public bool Delete(int id)
        {
            return _cityAreaService.Delete(id);
        }
    }
}