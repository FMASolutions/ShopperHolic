using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ICustomerRepo
    {
        int Create(CustomerCreateDTO entityToCreate);
        CustomerDTO GetByID(int id);
        IEnumerable<CustomerPreviewDTO> GetAllPreview();
        CustomerDTO Update(CustomerDTO updatedRecord);
        bool Delete(int id);
        IEnumerable<CustomerTypeDTO> GetCustomerTypes();
    }
}