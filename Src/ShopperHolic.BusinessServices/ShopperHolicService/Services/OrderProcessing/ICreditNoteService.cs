using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface ICreditNoteService : IDisposable
    {
        IEnumerable<CreditNoteItemDTO> CreditRMA(int rmaID);
        IEnumerable<CreditNoteItemDTO> GetByID(int creditNoteID);
        IEnumerable<CreditNotePreviewDTO> GetAllPreview();
        IEnumerable<CreditNotePreviewDTO> GetCreditNotesForOrder(int orderID);
        IEnumerable<CreditNotePreviewDTO> GetCreditNotesForRMA(int rmaID);
    }
}