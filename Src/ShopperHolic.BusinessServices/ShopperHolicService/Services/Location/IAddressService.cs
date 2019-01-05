using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IAddressService : IDisposable
    {
        AddressDTO Create(AddressCreateDTO modelToCreate);
        AddressDTO GetByID(int id);
        IEnumerable<AddressPreviewDTO> GetAllPreview();
        AddressDTO Update(AddressDTO newModel);
        bool Delete(int id);
        AddressDetailedDTO GetDetailedAddress(int addressID);
    }
}