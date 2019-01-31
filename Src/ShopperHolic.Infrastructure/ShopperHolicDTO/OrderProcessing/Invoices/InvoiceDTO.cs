using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class InvoiceDTO
    {
        public int InvoiceID { get; set; }
        public int InvoiceItemID { get; set; }
        public int OrderID { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string ItemDescription { get; set; }
        public int ItemQty { get; set; }
        public decimal ItemPrice { get; set; }
        public decimal ItemTotal { get; set; }
        public string InvoiceItemStatus { get; set; }
    }
}