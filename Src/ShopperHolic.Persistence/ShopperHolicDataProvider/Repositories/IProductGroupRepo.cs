using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IProductGroupRepo
    {
        int CreateProductGroup(ProductGroup entityToCreate);
        ProductGroupDTO GetProductGroupByID(int productGroupID);
    }
}