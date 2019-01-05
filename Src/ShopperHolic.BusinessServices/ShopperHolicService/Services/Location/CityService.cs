using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class CityService : BaseService, ICityService
    {
        public CityService(string connectionString) : base(connectionString) { }
        internal CityService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public CityDTO Create(CityCreateDTO modelToCreate)
        {
            try
            {
                int newID = UOW.CityRepo.Create(modelToCreate);
                var createResult = UOW.CityRepo.GetByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public CityDTO GetByID(int id)
        {
            return UOW.CityRepo.GetByID(id);
        }
        public IEnumerable<CityPreviewDTO> GetAllPreview()
        {
            return UOW.CityRepo.GetAllPreview();
        }
        public CityDTO Update(CityDTO newModel)
        {
            try
            {
                CityDTO returnModel = UOW.CityRepo.Update(newModel);
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
                bool success = UOW.CityRepo.Delete(id);
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