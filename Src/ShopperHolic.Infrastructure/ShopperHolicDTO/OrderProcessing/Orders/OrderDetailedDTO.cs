using System.Collections.Generic;
using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class OrderDetailedDTO
    {
        public OrderDetailedDTO()
        {
            Header = new OrderDTO();
        }
        public OrderDTO Header { get; set; }
        public IEnumerable<OrderItemDTO> Items { get; set; }
        public IEnumerable<DeliveryNotePreviewDTO> DeliveryNotes {get; set;}
        public IEnumerable<InvoicePreviewDTO> Invoices {get; set;}
    }
}