using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IDeliveryNoteService : IDisposable
    {
        IEnumerable<DeliveryNoteItemDTO> DeliverOrder(int orderID);
        IEnumerable<DeliveryNoteItemDTO> GetByID(int id);
        IEnumerable<DeliveryNotePreviewDTO> GetAllPreview();
    }
}