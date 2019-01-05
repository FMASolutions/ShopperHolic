using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IAddressRepo
    {
        int Create(AddressCreateDTO entityToCreate);
        AddressDTO GetByID(int id);
        IEnumerable<AddressPreviewDTO> GetAllPreview();
        AddressDTO Update(AddressDTO updatedRecord);
        bool Delete(int id);
        AddressDetailedDTO GetDetailedAddress(int addressID);
    }
}