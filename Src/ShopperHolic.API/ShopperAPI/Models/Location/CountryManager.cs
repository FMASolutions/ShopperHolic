using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class CountryManager : IDisposable
    {
        public CountryManager(ICountryService service)
        {
            _countryService = service;
        }

        public void Dispose()
        {
            _countryService.Dispose();
        }

        private ICountryService _countryService;

        public CountryDTO Create(CountryCreateDTO createModel)
        {
            return _countryService.Create(createModel);
        }
        public CountryDTO GetByID(int id)
        {
            return _countryService.GetByID(id);
        }

        public List<CountryDTO> GetAll()
        {
            var returnList = new List<CountryDTO>();
            foreach(var current in _countryService.GetAll())
                returnList.Add(current);
            return returnList;
        }

        public CountryDTO Update(CountryDTO newModel)
        {
            return _countryService.Update(newModel);
        }

        public bool Delete(int id)
        {
            return _countryService.Delete(id);
        }
    }
}