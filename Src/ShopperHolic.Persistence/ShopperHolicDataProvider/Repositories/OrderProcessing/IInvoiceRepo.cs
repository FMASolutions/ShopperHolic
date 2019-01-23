using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IInvoiceRepo
    {
        int InvoiceOrder(int orderID);
        InvoiceDTO GetByID(int id);
        IEnumerable<InvoicePreviewDTO> GetAllPreview();       
    }
}
