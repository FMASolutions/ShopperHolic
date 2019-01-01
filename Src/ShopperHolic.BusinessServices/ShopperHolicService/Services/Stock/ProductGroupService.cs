using System;
using System.Collections.Generic;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

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
                int newID = UOW.ProductGroupRepo.CreateProductGroup(entityToCreate);
                var createResult = UOW.ProductGroupRepo.GetProductGroupByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch(Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
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
            try
            {
                ProductGroupDTO returnModel = UOW.ProductGroupRepo.Update(newModel);
                UOW.SaveChanges();
                return returnModel;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public bool Delete(int productGroupID)
        {
            try
            {
                bool success = UOW.ProductGroupRepo.Delete(productGroupID);
                UOW.SaveChanges();
                return success;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
    }
}