using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IProductGroupRepo
    {
        int CreateProductGroup(ProductGroup entityToCreate);
        ProductGroupDTO GetProductGroupByID(int productGroupID);
        IEnumerable<ProductGroupPreviewDTO> GetAllPreview();       
        ProductGroupDTO Update(ProductGroupDTO updatedProd);
        bool Delete(int id);
    }
}