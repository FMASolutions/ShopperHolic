using System.Collections.Generic;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class StockService : BaseService, IStockService
    {
        public StockService(string connectionString) : base(connectionString) { }
        internal StockService(IUnitOfWork unitOfWork) : base(unitOfWork) { }
    }
}