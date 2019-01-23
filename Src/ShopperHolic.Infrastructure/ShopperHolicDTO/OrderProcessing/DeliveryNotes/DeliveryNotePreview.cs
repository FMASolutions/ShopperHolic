using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class DeliveryNotePreview
    {
        public int DeliveryNoteID {get;set;}
        public int OrderHeaderID {get;set;}
        public DateTime DeliveryDate {get;set;}
    }
}