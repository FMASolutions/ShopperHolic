using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IProductGroupRepo
    {
        int CreateProductGroup(ProductGroup entityToCreate);       
    }
}