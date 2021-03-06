using System;
using System.Collections.Generic;
using ShopperHolic.API.ShopperAPI.Models.Security;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class UserManager : IDisposable
    {
        public UserManager(IUserService service)
        {
            _UserService = service;
        }

        public void Dispose()
        {
            _UserService.Dispose();
        }

        private IUserService _UserService;

        public UserProfileDTO Create(UserCreateDTO createModel, EncSettings settings)
        {
            return _UserService.Create(createModel, settings.Key, settings.IV);
        }
        public UserProfileDTO GetByID(int id)
        {
            return _UserService.GetByID(id);
        }

        public List<UserPreviewDTO> GetAllPreview()
        {
            var returnList = new List<UserPreviewDTO>();
            foreach (var current in _UserService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public UserProfileDTO Update(UserProfileDTO newModel, EncSettings settings)
        {
            return _UserService.Update(newModel, settings.Key, settings.IV);
        }

        public bool Delete(int id)
        {
            return _UserService.Delete(id);
        }

        public List<UserRoleTypeDTO> GetAvailableRoles()
        {
            var returnList = new List<UserRoleTypeDTO>();
            foreach (var item in _UserService.GetAvailableRoles())
                returnList.Add(item);
            return returnList;
        }

        public UserDetailedDTO GetDetailedUser(int userID)
        {
            return _UserService.GetDetailedUser(userID);
        }

        public bool AddSupplierLogin(int userID, int supplierID)
        {
            return _UserService.AddSupplierLogin(new SupplierLoginDTO() { SupplierID = supplierID, UserID = userID });
        }
        public bool AddCustomerLogin(int userID, int customerID)
        {
            return _UserService.AddCustomerLogin(new CustomerLoginDTO() { CustomerID = customerID, UserID = userID });
        }
        public bool RemoveSupplierLogin(int userID, int supplierID)
        {
            return _UserService.RemoveSupplierLogin(new SupplierLoginDTO() { SupplierID = supplierID, UserID = userID });
        }
        public bool RemoveCustomerLogin(int userID, int customerID)
        {
            return _UserService.RemoveCustomerLogin(new CustomerLoginDTO() { CustomerID = customerID, UserID = userID });
        }


    }
}