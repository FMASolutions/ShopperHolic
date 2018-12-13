using System.Data;
using System;
namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public abstract class BaseRepo : IDisposable
    {
        public BaseRepo(IDbTransaction transaction)
        {
            Transaction = transaction;
        }
        public void Dispose()
        {
            Connection.Dispose();
        }
        protected IDbConnection Connection { get { return Transaction.Connection; } }
        protected IDbTransaction Transaction { get; private set; }
    }
}