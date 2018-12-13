namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public abstract class BaseService
    {
        public BaseService(string connectionString)
        {
            UOW = new UnitOfWork(connectionString);
        }
        internal BaseService(IUnitOfWork uow)
        {
            UOW = uow;
        }
        internal IUnitOfWork UOW {get;}
    }
}