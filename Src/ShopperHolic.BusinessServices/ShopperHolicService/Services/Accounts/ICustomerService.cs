using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface ICustomerService : IDisposable
    {
        CustomerDTO Create(CustomerCreateDTO modelToCreate);
        CustomerDTO GetByID(int id);
        IEnumerable<CustomerPreviewDTO> GetAllPreview();
        CustomerDTO Update(CustomerDTO newModel);
        bool Delete(int id);
    }
}