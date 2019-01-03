using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IProductGroupRepo
    {
        int Create(ProductGroup entityToCreate);
        ProductGroupDTO GetByID(int id);
        IEnumerable<ProductGroupPreviewDTO> GetAllPreview();       
        ProductGroupDTO Update(ProductGroupDTO updatedRecord);
        bool Delete(int id);
    }
}