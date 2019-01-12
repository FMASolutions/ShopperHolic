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
        public UserProfileDTO GetyByID(int id)
        {
            return _UserService.GetByID(id);
        }

        public List<UserPreviewDTO> GetAllPreview()
        {
            var returnList = new List<UserPreviewDTO>();
            foreach(var current in _UserService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public UserProfileDTO Update(UserProfileDTO newModel, EncSettings settings)
        {
            return _UserService.Update(newModel,settings.Key,settings.IV);
        }

        public bool Delete(int id)
        {
            return _UserService.Delete(id);
        }
    }
}