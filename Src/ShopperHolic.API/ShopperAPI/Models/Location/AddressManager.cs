using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class AddressManager : IDisposable
    {
        public AddressManager(IAddressService service)
        {
            _addressService = service;
        }

        public void Dispose()
        {
            _addressService.Dispose();
        }

        private IAddressService _addressService;

        public AddressDTO Create(AddressCreateDTO createModel)
        {
            return _addressService.Create(createModel);
        }
        public AddressDTO GetyByID(int id)
        {
            return _addressService.GetByID(id);
        }

        public List<AddressPreviewDTO> GetAllPreview()
        {
            var returnList = new List<AddressPreviewDTO>();
            foreach(var current in _addressService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public AddressDTO Update(AddressDTO newModel)
        {
            return _addressService.Update(newModel);
        }

        public bool Delete(int id)
        {
            return _addressService.Delete(id);
        }

        public AddressDetailedDTO GetDetailedAddress(int addressID)
        {
            return _addressService.GetDetailedAddress(addressID);
        }
    }
}