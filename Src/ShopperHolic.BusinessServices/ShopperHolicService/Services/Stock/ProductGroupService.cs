using System;
using System.Collections.Generic;
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
                int newID = UOW.ProductGroupRepo.Create(modelToCreate);
                var createResult = UOW.ProductGroupRepo.GetByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public ProductGroupDTO GetByID(int id)
        {
            return UOW.ProductGroupRepo.GetByID(id);
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
        public bool Delete(int id)
        {
            try
            {
                bool success = UOW.ProductGroupRepo.Delete(id);
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