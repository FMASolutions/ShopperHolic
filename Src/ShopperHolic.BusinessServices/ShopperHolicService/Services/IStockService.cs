using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IStockService
    {
        ProductGroupDTO CreateProductGroup(CreateProductGroupDTO modelToCreate);
        ProductGroupDTO GetProductGroupByID(int productGroupID);
    }
}