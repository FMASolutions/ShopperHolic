using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IDeliveryNoteRepo
    {
        int DeliverOrder(int orderID);
        IEnumerable<DeliveryNoteDTO> GetByID(int id);
        IEnumerable<DeliveryNotePreviewDTO> GetAllPreview();
    }
}
