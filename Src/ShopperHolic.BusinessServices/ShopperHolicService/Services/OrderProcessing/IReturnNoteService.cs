using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IReturnNoteService : IDisposable
    {
        IEnumerable<ReturnNoteItemDTO> ProcessReturn(int rmaID);
        IEnumerable<ReturnNoteItemDTO> GetByID(int returnNoteID);
        IEnumerable<ReturnNotePreviewDTO> GetAllPreview();
        IEnumerable<ReturnNotePreviewDTO> GetReturnNotesForOrder(int orderID);
        IEnumerable<ReturnNotePreviewDTO> GetReturnNotesForRMA(int rmaID);
    }
}