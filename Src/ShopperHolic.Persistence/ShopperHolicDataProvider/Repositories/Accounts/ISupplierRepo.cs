using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ISupplierRepo
    {
        int Create(SupplierCreateDTO entityToCreate);
        SupplierDTO GetByID(int id);
        IEnumerable<SupplierPreviewDTO> GetAllPreview();
        SupplierDTO Update(SupplierDTO updatedRecord);
        bool Delete(int id);
    }
}