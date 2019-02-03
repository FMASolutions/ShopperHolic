using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IInvoiceService : IDisposable
    {
        IEnumerable<InvoiceItemDTO> InvoiceOrder(int orderID);
        IEnumerable<InvoiceItemDTO> GetByID(int id);
        IEnumerable<InvoicePreviewDTO> GetAllPreview();
    }
}