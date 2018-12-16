using System;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories;

namespace ShopperHolic.BusinessServices.ShopperHolicService
{
    public interface IUnitOfWork : IDisposable
    {
        ISecurityRepo SecurityRepo {get;}
        IProductGroupRepo ProductGroupRepo {get;}
        void SaveChanges();
        void RollbackChanges(bool createFollowUpTransaction = true);
    }
}