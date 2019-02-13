using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class ReturnNoteService : BaseService, IReturnNoteService
    {
        public ReturnNoteService(string connectionString) : base(connectionString) { }
        internal ReturnNoteService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public IEnumerable<ReturnNoteItemDTO> ProcessReturn(int rmaID)
        {
            try
            {
                int newReturnNoteID = UOW.ReturnNoteRepo.ProcessReturn(rmaID);
                UOW.SaveChanges();
                return UOW.ReturnNoteRepo.GetByID(newReturnNoteID);
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public IEnumerable<ReturnNoteItemDTO> GetByID(int returnNoteID)
        {
            return UOW.ReturnNoteRepo.GetByID(returnNoteID);
        }
        public IEnumerable<ReturnNotePreviewDTO> GetAllPreview()
        {
            return UOW.ReturnNoteRepo.GetAllPreview();
        }
        public IEnumerable<ReturnNotePreviewDTO> GetReturnNotesForOrder(int orderID)
        {
            return UOW.ReturnNoteRepo.GetReturnNotesForOrder(orderID);
        }
        public IEnumerable<ReturnNotePreviewDTO> GetReturnNotesForRMA(int rmaID)
        {
            return UOW.ReturnNoteRepo.GetReturnNotesForRMA(rmaID);
        }
    }
}