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

        public ProductGroupDTO CreateProductGroup(CreateProductGroupDTO prodGroupToCreate)
        {
            return _stockService.CreateProductGroup(prodGroupToCreate);
        }
    }
}