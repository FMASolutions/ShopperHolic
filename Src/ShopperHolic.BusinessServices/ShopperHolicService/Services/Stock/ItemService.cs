using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class ItemService : BaseService, IItemService
    {
        public ItemService(string connectionString) : base(connectionString) { }
        internal ItemService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public ItemDTO Create(ItemCreateDTO modelToCreate)
        {
            try
            {
                int newID = UOW.ItemRepo.Create(modelToCreate);
                var createResult = UOW.ItemRepo.GetByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public ItemDTO GetByID(int id)
        {
            return UOW.ItemRepo.GetByID(id);
        }
        public IEnumerable<ItemPreviewDTO> GetAllPreview()
        {
            return UOW.ItemRepo.GetAllPreview();
        }
        public ItemDTO Update(ItemDTO newModel)
        {
            try
            {
                ItemDTO returnModel = UOW.ItemRepo.Update(newModel);
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
                bool success = UOW.ItemRepo.Delete(id);
                UOW.SaveChanges();
                return success;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }

        public bool UpdateImage(int id, string imageName)
        {
            try
            {
                bool success = UOW.ItemRepo.UpdateImageNane(id,imageName);
                UOW.SaveChanges();
                return success;
            }
            catch(Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
    }
}