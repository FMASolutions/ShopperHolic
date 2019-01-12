using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface ISupplierService : IDisposable
    {
        SupplierDTO Create(SupplierCreateDTO modelToCreate);
        SupplierDTO GetByID(int id);
        IEnumerable<SupplierPreviewDTO> GetAllPreview();
        SupplierDTO Update(SupplierDTO newModel);
        bool Delete(int id);
    }
}