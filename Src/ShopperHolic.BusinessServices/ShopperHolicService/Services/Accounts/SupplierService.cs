using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class SupplierService : BaseService, ISupplierService
    {
        public SupplierService(string connectionString) : base(connectionString) { }
        internal SupplierService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public SupplierDTO Create(SupplierCreateDTO modelToCreate)
        {
            try
            {
                int newID = UOW.SupplierRepo.Create(modelToCreate);
                var createResult = UOW.SupplierRepo.GetByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public SupplierDTO GetByID(int id)
        {
            return UOW.SupplierRepo.GetByID(id);
        }
        public IEnumerable<SupplierPreviewDTO> GetAllPreview()
        {
            return UOW.SupplierRepo.GetAllPreview();
        }
        public SupplierDTO Update(SupplierDTO newModel)
        {
            try
            {
                var returnModel = UOW.SupplierRepo.Update(newModel);
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
                bool success = UOW.SupplierRepo.Delete(id);
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