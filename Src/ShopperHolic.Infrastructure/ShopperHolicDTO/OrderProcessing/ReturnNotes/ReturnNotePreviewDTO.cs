using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class ReturnNotePreviewDTO
    {
        public int ReturnNoteID {get;set;}
        public int OrderHeaderID {get;set;}
        public int RMAHeaderID {get;set;}
        public DateTime ReturnedDate {get;set;}
        public DateTime RequestedDate {get;set;}
        public string CustomerName {get;set;}
    }
}