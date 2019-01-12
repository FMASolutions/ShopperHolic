using System;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories;

namespace ShopperHolic.BusinessServices.ShopperHolicService
{
    public interface IUnitOfWork : IDisposable
    {
        ISecurityRepo SecurityRepo {get;}
        IProductGroupRepo ProductGroupRepo {get;}
        ISubGroupRepo SubGroupRepo {get;}
        IItemRepo ItemRepo {get;}
        ICountryRepo CountryRepo {get;}
        ICityRepo CityRepo {get;}
        ICityAreaRepo CityAreaRepo {get;}
        IAddressRepo AddressRepo {get;}
        IUserRepo UserRepo {get;}
        ICustomerRepo CustomerRepo {get;}
        ISupplierRepo SupplierRepo {get;}
        void SaveChanges();
        void RollbackChanges(bool createFollowUpTransaction = true);
    }
}
