using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class CountryService : BaseService, ICountryService
    {
        public CountryService(string connectionString) : base(connectionString) { }
        internal CountryService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public CountryDTO Create(CountryCreateDTO modelToCreate)
        {
            try
            {
                int newID = UOW.CountryRepo.Create(modelToCreate);
                var createResult = UOW.CountryRepo.GetByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public CountryDTO GetByID(int id)
        {
            return UOW.CountryRepo.GetByID(id);
        }
        public IEnumerable<CountryDTO> GetAll()
        {
            return UOW.CountryRepo.GetAll();
        }
        public CountryDTO Update(CountryDTO newModel)
        {
            try
            {
                CountryDTO returnModel = UOW.CountryRepo.Update(newModel);
                UOW.SaveChanges();
                return returnModel;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public bool Delete(int id)
        {
            try
            {
                bool success = UOW.CountryRepo.Delete(id);
                UOW.SaveChanges();
                return success;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
    }
}