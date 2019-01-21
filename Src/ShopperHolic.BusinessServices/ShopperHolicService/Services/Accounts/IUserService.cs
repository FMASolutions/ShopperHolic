using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IUserService : IDisposable
    {
        UserProfileDTO Create(UserCreateDTO modelToCreate, string key, string IV);
        UserProfileDTO GetByID(int id);
        IEnumerable<UserPreviewDTO> GetAllPreview();
        UserProfileDTO Update(UserProfileDTO newModel, string key, string IV);
        bool Delete(int id);
        IEnumerable<UserRoleTypeDTO> GetAvailableRoles();
        UserDetailedDTO GetDetailedUser(int userID);
    }
}