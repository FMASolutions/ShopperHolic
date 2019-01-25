using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IInvoiceService : IDisposable
    {
        IEnumerable<InvoiceDTO> InvoiceOrder(int orderID);
        IEnumerable<InvoiceDTO> GetByID(int id);
        IEnumerable<InvoicePreviewDTO> GetAllPreview();
    }
}