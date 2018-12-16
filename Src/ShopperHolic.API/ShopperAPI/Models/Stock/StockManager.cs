using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    //TODO EVALUATE IF WE WANT TO KEEP THIS CONSIDERING WE HAVE SPLIT OUT
    //INTO THE PrdouctGroupService
    public class StockManager
    {
        public StockManager(IStockService stockService)
        {
            _stockService = stockService;
        }

        private IStockService _stockService;
    }
}