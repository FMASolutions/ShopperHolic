using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IStockService
    {
        ProductGroupDTO CreateProductGroup(ProductGroupCreateDTO modelToCreate);
        ProductGroupDTO GetProductGroupByID(int productGroupID);
    }
}