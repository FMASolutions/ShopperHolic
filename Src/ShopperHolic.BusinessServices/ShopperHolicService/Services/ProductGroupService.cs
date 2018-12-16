using System.Collections.Generic;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class ProductGroupService : BaseService, IProductGroupService
    {
        public ProductGroupService(string connectionString) : base(connectionString) { }
        internal ProductGroupService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public ProductGroupDTO Create(ProductGroupCreateDTO modelToCreate)
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
            catch (System.Data.SqlClient.SqlException ex)
            {
                UOW.RollbackChanges();
                BaseCustomException customException = SqlExceptionHandler.Handle(ex);
                throw customException;
            }
        }
        public ProductGroupDTO GetByID(int productGroupID)
        {
            return UOW.ProductGroupRepo.GetProductGroupByID(productGroupID);
        }

        public IEnumerable<ProductGroupPreviewDTO> GetAllPreview()
        {
            return UOW.ProductGroupRepo.GetAllPreview();
        }

        public ProductGroupDTO Update(ProductGroupDTO newModel)
        {
            ProductGroupDTO returnModel = UOW.ProductGroupRepo.Update(newModel);
            if (returnModel != null) { UOW.SaveChanges(); }
            else { UOW.RollbackChanges(); }
            return returnModel;
        }
        public bool Delete(int productGroupID)
        {
            bool success = UOW.ProductGroupRepo.Delete(productGroupID);
            if (success) { UOW.SaveChanges(); }
            else { UOW.RollbackChanges(); }
            return success;
        }

    }
}