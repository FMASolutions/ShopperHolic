using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using FMASolutionsCore.DataServices.CryptoHelper;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class UserService : BaseService, IUserService
    {
        public UserService(string connectionString) : base(connectionString) { }
        internal UserService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public UserProfileDTO Create(UserCreateDTO modelToCreate, string key, string IV)
        {
            try
            {
                string encryptedPassword = CryptoService.Encrypt(modelToCreate.Password, key, IV);
                int newID = UOW.UserRepo.Create(modelToCreate, encryptedPassword);
                var createResult = UOW.UserRepo.GetByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public UserProfileDTO GetByID(int id)
        {
            return UOW.UserRepo.GetByID(id);
        }
        public IEnumerable<UserPreviewDTO> GetAllPreview()
        {
            return UOW.UserRepo.GetAllPreview();
        }
        public UserProfileDTO Update(UserProfileDTO newModel, string key, string IV)
        {
            try
            {
                newModel.EncryptedPassword = CryptoService.Encrypt(newModel.Password, key, IV);
                var returnModel = UOW.UserRepo.Update(newModel);
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
                bool success = UOW.UserRepo.Delete(id);
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