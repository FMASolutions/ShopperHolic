namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public abstract class BaseService
    {
        //Used when a new UOW is needed to be created (Vast majority of the time).
        public BaseService(string connectionString)
        {
            UOW = new UnitOfWork(connectionString);
        }
        //Used when a service is referenced in an internal service and the same connection / transaction is required
        internal BaseService(IUnitOfWork uow)
        {
            UOW = uow;
        }
        internal IUnitOfWork UOW {get;}
    }
}