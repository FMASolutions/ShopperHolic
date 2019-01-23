using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class InvoicePreviewDTO
    {
        public int InvoiceID { get; set; }
        public int OrderID {get;set;}
        public string InvoiceStatus { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal InvoiceTotal { get; set; }
    }
}