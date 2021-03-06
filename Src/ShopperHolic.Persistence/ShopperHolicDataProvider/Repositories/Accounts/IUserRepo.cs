using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IUserRepo
    {
        int Create(UserCreateDTO entityToCreate, string encryptedPassword);
        UserProfileDTO GetByID(int id);
        IEnumerable<UserPreviewDTO> GetAllPreview();
        UserProfileDTO Update(UserProfileDTO updatedRecord);
        bool Delete(int id);
        IEnumerable<UserRoleTypeDTO> GetAvailableRoles();
        IEnumerable<SupplierLoginDTO> GetLinkedSuppliers(int userid);
        IEnumerable<CustomerLoginDTO> GetLinkedCustomers(int userid);
        bool AddSupplierLogin(SupplierLoginDTO createEntity);
        bool RemoveSupplierLogin(SupplierLoginDTO removeEntity);
        bool AddCustomerLogin(CustomerLoginDTO createEntity);
        bool RemoveCustomerLogin(CustomerLoginDTO removeEntity);
        bool SetUserClaim(int userID, string claimType, string claimValue);
        bool ResetUserClaims(int userID);
    }
}