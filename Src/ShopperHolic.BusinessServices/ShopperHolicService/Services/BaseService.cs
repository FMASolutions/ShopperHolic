namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public abstract class BaseService
    {
        public BaseService(IUnitOfWork uow)
        {
            UOW = uow;
        }
        internal IUnitOfWork UOW {get;}
    }
}