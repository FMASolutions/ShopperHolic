using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class StockService : BaseService, IStockService
    {
        public StockService(string connectionString) : base(connectionString) { }
        internal StockService(IUnitOfWork unitOfWork) : base(unitOfWork) { }
        
        public ProductGroupDTO CreateProductGroup(ProductGroupCreateDTO modelToCreate)
        {
            try
            {
                ProductGroup entityToCreate = new ProductGroup(modelToCreate.ProductGroupCode, modelToCreate.ProductGroupName, modelToCreate.ProductGroupDescription);
                //TODO Validate ProductGroup?????
                int newID = UOW.ProductGroupRepo.CreateProductGroup(entityToCreate);
                var createResult = UOW.ProductGroupRepo.GetProductGroupByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch(System.Data.SqlClient.SqlException ex)
            {
                UOW.RollbackChanges();
                BaseCustomException customException = SqlExceptionHandler.Handle(ex);
                throw customException;
            }
        }
        public ProductGroupDTO GetProductGroupByID(int productGroupID)
        {
            return UOW.ProductGroupRepo.GetProductGroupByID(productGroupID);
        }

    }
}