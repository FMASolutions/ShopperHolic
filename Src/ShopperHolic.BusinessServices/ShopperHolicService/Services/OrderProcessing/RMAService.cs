using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class RMAService : BaseService, IRMAService
    {
        public RMAService(string connectionString) : base(connectionString) { }
        internal RMAService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public RMADetailedDTO Create(CreateRMADTO entityToCreate)
        {
            try
            {
                int newRMAID = UOW.RMARepo.Create(entityToCreate);
                UOW.SaveChanges();
                return GetByID(newRMAID);
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public RMADetailedDTO GetByID(int rmaID)
        {
            return new RMADetailedDTO()
            {
                Header = UOW.RMARepo.GetByID(rmaID),
                Items = UOW.RMARepo.GetItemsForRMA(rmaID),
                ReturnNotes = UOW.ReturnNoteRepo.GetReturnNotesForRMA(rmaID),
                CreditNotes = UOW.CreditNoteRepo.GetCreditNotesForRMA(rmaID)
            };
        }
        public IEnumerable<RMAPreviewDTO> GetAllPreview()
        {
            return UOW.RMARepo.GetAllPreview();
        }
        public bool Delete(int rmaID)
        {
            try
            {
                bool result = UOW.RMARepo.Delete(rmaID);
                UOW.SaveChanges();
                return result;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public RMAItemDTO GetRMAItemByID(int rmaItemID)
        {
            return UOW.RMARepo.GetRMAItemByID(rmaItemID);
        }
        public IEnumerable<RMAItemDTO> GetItemsForRMA(int rmaID)
        {
            return UOW.RMARepo.GetItemsForRMA(rmaID);
        }
        public RMAItemDTO AddItemToRMA(CreateRMAItemDTO entityToCreate)
        {
            try
            {
                var rmaItemID = UOW.RMARepo.AddItemToRMA(entityToCreate);
                UOW.SaveChanges();
                return UOW.RMARepo.GetRMAItemByID(rmaItemID);
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public RMAItemDTO UpdateRMAItem(UpdateRMAItemDTO updatedRecord)
        {
            try
            {
                var returnModel = UOW.RMARepo.UpdateRMAItem(updatedRecord);
                UOW.SaveChanges();
                return returnModel;

            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public bool RemoveItemFromRMA(int rmaItemID)
        {
            try
            {
                var result = UOW.RMARepo.RemoveItemFromRMA(rmaItemID);
                UOW.SaveChanges();
                return result;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
    }
}