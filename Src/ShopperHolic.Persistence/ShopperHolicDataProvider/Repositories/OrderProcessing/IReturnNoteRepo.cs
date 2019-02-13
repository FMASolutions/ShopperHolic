using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IReturnNoteRepo
    {
        int ProcessReturn(int rmaID);
        IEnumerable<ReturnNoteItemDTO> GetByID(int returnNoteID);
        IEnumerable<ReturnNotePreviewDTO> GetAllPreview();
        IEnumerable<ReturnNotePreviewDTO> GetReturnNotesForOrder(int orderID);
        IEnumerable<ReturnNotePreviewDTO> GetReturnNotesForRMA(int rmaID);
    }
}
