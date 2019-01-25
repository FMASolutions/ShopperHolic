using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IDeliveryNoteService : IDisposable
    {
        IEnumerable<DeliveryNoteDTO> DeliverOrder(int orderID);
        IEnumerable<DeliveryNoteDTO> GetByID(int id);
        IEnumerable<DeliveryNotePreviewDTO> GetAllPreview();
    }
}