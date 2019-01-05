using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class AddressService : BaseService, IAddressService
    {
        public AddressService(string connectionString) : base(connectionString) { }
        internal AddressService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public AddressDTO Create(AddressCreateDTO modelToCreate)
        {
            try
            {
                int newID = UOW.AddressRepo.Create(modelToCreate);
                var createResult = UOW.AddressRepo.GetByID(newID);
                UOW.SaveChanges();
                return createResult;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public AddressDTO GetByID(int id)
        {
            return UOW.AddressRepo.GetByID(id);
        }
        public IEnumerable<AddressPreviewDTO> GetAllPreview()
        {
            return UOW.AddressRepo.GetAllPreview();
        }
        public AddressDTO Update(AddressDTO newModel)
        {
            try
            {
                AddressDTO returnModel = UOW.AddressRepo.Update(newModel);
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
                bool success = UOW.AddressRepo.Delete(id);
                UOW.SaveChanges();
                return success;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public AddressDetailedDTO GetDetailedAddress(int addressID)
        {
            return UOW.AddressRepo.GetDetailedAddress(addressID);
        }
    }
}