using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class StockManager
    {
        public StockManager(IStockService stockService)
        {
            _stockService = stockService;
        }

        private IStockService _stockService;

        public ProductGroupDTO CreateProductGroup(ProductGroupCreateDTO prodGroupToCreate)
        {
            return _stockService.CreateProductGroup(prodGroupToCreate);
        }
        public ProductGroupDTO GetyProductGroupByID(int id)
        {
            return _stockService.GetProductGroupByID(id);
        }
    }
}