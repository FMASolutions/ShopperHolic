using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IProductGroupRepo
    {
        int Create(ProductGroupCreateDTO entityToCreate);
        ProductGroupDTO GetByID(int id);
        IEnumerable<ProductGroupPreviewDTO> GetAllPreview();       
        ProductGroupDTO Update(ProductGroupDTO updatedRecord);
        bool Delete(int id);
    }
}