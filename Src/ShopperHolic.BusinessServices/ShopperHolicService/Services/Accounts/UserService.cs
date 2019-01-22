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
                SetupUserClaims(createResult.UserID, createResult.UserRoleTypeID);
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
                var currentModel = GetByID(newModel.UserID);

                if (!string.IsNullOrEmpty(newModel.Password) && !string.IsNullOrWhiteSpace(newModel.Password))
                    newModel.EncryptedPassword = CryptoService.Encrypt(newModel.Password, key, IV);
                
                else
                    newModel.EncryptedPassword = currentModel.EncryptedPassword;

                if (newModel.UserRoleTypeID != currentModel.UserRoleTypeID)
                    SetupUserClaims(newModel.UserID, newModel.UserRoleTypeID);
                
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

        public IEnumerable<UserRoleTypeDTO> GetAvailableRoles()
        {
            return UOW.UserRepo.GetAvailableRoles();
        }

        public UserDetailedDTO GetDetailedUser(int userID)
        {
            var profile = UOW.UserRepo.GetByID(userID);
            var customerLogins = UOW.UserRepo.GetLinkedCustomers(userID);
            var supplierLogins = UOW.UserRepo.GetLinkedSuppliers(userID);
            var returnProfile = new UserDetailedDTO();

            foreach (var item in supplierLogins)
                returnProfile.SupplierLogins.Add(item);
            foreach (var item in customerLogins)
                returnProfile.CustomerLogins.Add(item);

            returnProfile.EmailAddress = profile.EmailAddress;
            returnProfile.KnownAs = profile.KnownAs;
            returnProfile.UserID = profile.UserID;
            returnProfile.UserRoleTypeID = profile.UserRoleTypeID;
            returnProfile.Username = profile.Username;

            return returnProfile;
        }

        public bool AddSupplierLogin(SupplierLoginDTO newEntity)
        {
            try
            {
                bool success = UOW.UserRepo.AddSupplierLogin(newEntity);
                UOW.SaveChanges();
                return success;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public bool AddCustomerLogin(CustomerLoginDTO newEntity)
        {
            try
            {
                bool success = UOW.UserRepo.AddCustomerLogin(newEntity);
                UOW.SaveChanges();
                return success;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public bool RemoveSupplierLogin(SupplierLoginDTO removeEntity)
        {
            try
            {
                bool success = UOW.UserRepo.RemoveSupplierLogin(removeEntity);
                UOW.SaveChanges();
                return success;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public bool RemoveCustomerLogin(CustomerLoginDTO removeEntity)
        {
            try
            {
                bool success = UOW.UserRepo.RemoveCustomerLogin(removeEntity);
                UOW.SaveChanges();
                return success;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }

        private void SetupUserClaims(int userID, int userRoleTypeID)
        {
            EUserRoles userRole = (EUserRoles)userRoleTypeID;
            ResetUserClaims(userID);
            switch (userRole)
            {
                case EUserRoles.Administrator:
                    SetupAdminUser(userID);
                    break;
                case EUserRoles.Customer:
                    SetupCustomerUser(userID);
                    break;
                case EUserRoles.TillOperator:
                    SetupTillOperatorUser(userID);
                    break;
                default:
                    throw new ArgumentOutOfRangeException(userRoleTypeID.ToString());
            }
        }

        private void ResetUserClaims(int userid)
        {
            UOW.UserRepo.ResetUserClaims(userid);
        }

        private void SetupAdminUser(int userid)
        {
            var allClaims = Enum.GetValues(typeof(EClaimTypes));
                foreach(var claim in allClaims)
                    UOW.UserRepo.SetUserClaim(userid, claim.ToString(), "true");
        }

        private void SetupCustomerUser(int userid)
        {
            var customerClaims = Enum.GetValues(typeof(ECustomerClaims));
                foreach(var claim in customerClaims)
                    UOW.UserRepo.SetUserClaim(userid, claim.ToString(), "true");
        }

        private void SetupTillOperatorUser(int userid)
        {
            var tillOperatorClaims = Enum.GetValues(typeof(ETillOperatorClaims));
                foreach(var claim in tillOperatorClaims)
                    UOW.UserRepo.SetUserClaim(userid, claim.ToString(), "true");
        }
    }
}