using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class CustomerService : BaseService, ICustomerService
    {
        public CustomerService(string connectionString) : base(connectionString) { }
        internal CustomerService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public CustomerDTO Create(CustomerCreateDTO modelToCreate)
        {
            try
            {
                int newID = UOW.CustomerRepo.Create(modelToCreate);
                var createResult = UOW.CustomerRepo.GetByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public CustomerDTO GetByID(int id)
        {
            return UOW.CustomerRepo.GetByID(id);
        }
        public IEnumerable<CustomerPreviewDTO> GetAllPreview()
        {
            return UOW.CustomerRepo.GetAllPreview();
        }
        public CustomerDTO Update(CustomerDTO newModel)
        {
            try
            {
                var returnModel = UOW.CustomerRepo.Update(newModel);
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
                bool success = UOW.CustomerRepo.Delete(id);
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