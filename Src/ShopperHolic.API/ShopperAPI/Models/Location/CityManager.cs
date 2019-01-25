using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class CityManager : IDisposable
    {
        public CityManager(ICityService service)
        {
            _cityService = service;
        }

        public void Dispose()
        {
            _cityService.Dispose();
        }

        private ICityService _cityService;

        public CityDTO Create(CityCreateDTO createModel)
        {
            return _cityService.Create(createModel);
        }
        public CityDTO GetByID(int id)
        {
            return _cityService.GetByID(id);
        }

        public List<CityPreviewDTO> GetAllPreview()
        {
            var returnList = new List<CityPreviewDTO>();
            foreach(var current in _cityService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public CityDTO Update(CityDTO newModel)
        {
            return _cityService.Update(newModel);
        }

        public bool Delete(int id)
        {
            return _cityService.Delete(id);
        }
    }
}