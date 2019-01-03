using System;
using System.Collections.Generic;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class SubGroupService : BaseService, ISubGroupService
    {
        public SubGroupService(string connectionString) : base(connectionString) { }
        internal SubGroupService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public SubGroupDTO Create(SubGroupCreateDTO modelToCreate)
        {
            try
            {
                SubGroup entityToCreate = new SubGroup(modelToCreate.SubGroupCode, modelToCreate.SubGroupName, modelToCreate.SubGroupDescription, modelToCreate.ProductGroupID);
                int newID = UOW.SubGroupRepo.Create(entityToCreate);
                var createResult = UOW.SubGroupRepo.GetByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public SubGroupDTO GetByID(int id)
        {
            return UOW.SubGroupRepo.GetByID(id);
        }
        public IEnumerable<SubGroupPreviewDTO> GetAllPreview()
        {
            return UOW.SubGroupRepo.GetAllPreview();
        }
        public SubGroupDTO Update(SubGroupDTO newModel)
        {
            try
            {
                SubGroupDTO returnModel = UOW.SubGroupRepo.Update(newModel);
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
                bool success = UOW.SubGroupRepo.Delete(id);
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