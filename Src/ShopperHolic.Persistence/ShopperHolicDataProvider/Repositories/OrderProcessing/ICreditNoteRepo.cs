using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ICreditNoteRepo
    {
        int CreditRMA(int rmaID);
        IEnumerable<CreditNoteItemDTO> GetByID(int creditNoteID);
        IEnumerable<CreditNotePreviewDTO> GetAllPreview();
        IEnumerable<CreditNotePreviewDTO> GetCreditNotesForOrder(int orderID);
        IEnumerable<CreditNotePreviewDTO> GetCreditNotesForRMA(int rmaID);
    }
}
