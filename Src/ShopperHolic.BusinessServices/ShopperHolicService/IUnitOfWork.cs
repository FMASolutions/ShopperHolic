using System;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories;

namespace ShopperHolic.BusinessServices.ShopperHolicService
{
    internal interface IUnitOfWork : IDisposable
    {
        ISecurityRepo SecurityRepo {get;}
        void SaveChanges();
    }
}
