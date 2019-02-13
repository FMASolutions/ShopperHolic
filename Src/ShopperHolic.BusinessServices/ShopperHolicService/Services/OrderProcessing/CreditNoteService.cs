using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class CreditNoteService : BaseService, ICreditNoteService
    {
        public CreditNoteService(string connectionString) : base(connectionString) { }
        internal CreditNoteService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public IEnumerable<CreditNoteItemDTO> CreditRMA(int rmaID)
        {
            try
            {
                int newCreditNoteID = UOW.CreditNoteRepo.CreditRMA(rmaID);
                UOW.SaveChanges();
                return UOW.CreditNoteRepo.GetByID(newCreditNoteID);
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public IEnumerable<CreditNoteItemDTO> GetByID(int creditNoteID)
        {
            return UOW.CreditNoteRepo.GetByID(creditNoteID);
        }
        public IEnumerable<CreditNotePreviewDTO> GetAllPreview()
        {
            return UOW.CreditNoteRepo.GetAllPreview();
        }
        public IEnumerable<CreditNotePreviewDTO> GetCreditNotesForOrder(int orderID)
        {
            return UOW.CreditNoteRepo.GetCreditNotesForOrder(orderID);
        }
        public IEnumerable<CreditNotePreviewDTO> GetCreditNotesForRMA(int rmaID)
        {
            return UOW.CreditNoteRepo.GetCreditNotesForRMA(rmaID);
        }
    }
}