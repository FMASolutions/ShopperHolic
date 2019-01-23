using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class DeliveryNotePreviewDTO
    {
        public int DeliveryNoteID {get;set;}
        public int OrderHeaderID {get;set;}
        public DateTime DeliveryDate {get;set;}
        public string CustomerName {get;set;}
    }
}


