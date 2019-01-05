using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class CityAreaService : BaseService, ICityAreaService
    {
        public CityAreaService(string connectionString) : base(connectionString) { }
        internal CityAreaService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public CityAreaDTO Create(CityAreaCreateDTO modelToCreate)
        {
            try
            {
                int newID = UOW.CityAreaRepo.Create(modelToCreate);
                var createResult = UOW.CityAreaRepo.GetByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public CityAreaDTO GetByID(int id)
        {
            return UOW.CityAreaRepo.GetByID(id);
        }
        public IEnumerable<CityAreaPreviewDTO> GetAllPreview()
        {
            return UOW.CityAreaRepo.GetAllPreview();
        }
        public CityAreaDTO Update(CityAreaDTO newModel)
        {
            try
            {
                CityAreaDTO returnModel = UOW.CityAreaRepo.Update(newModel);
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
                bool success = UOW.CityAreaRepo.Delete(id);
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