using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class DeliveryNoteService : BaseService, IDeliveryNoteService
    {
        public DeliveryNoteService(string connectionString) : base(connectionString) { }
        internal DeliveryNoteService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public IEnumerable<DeliveryNoteItemDTO> DeliverOrder(int orderID)
        {
            try
            {
                int newNoteID = UOW.DeliveryNoteRepo.DeliverOrder(orderID);
                UOW.SaveChanges();
                return UOW.DeliveryNoteRepo.GetByID(newNoteID);
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public IEnumerable<DeliveryNoteItemDTO> GetByID(int id)
        {
                return UOW.DeliveryNoteRepo.GetByID(id);
        }
        public IEnumerable<DeliveryNotePreviewDTO> GetAllPreview()
        {
            return UOW.DeliveryNoteRepo.GetAllPreview();
        }
    }
}