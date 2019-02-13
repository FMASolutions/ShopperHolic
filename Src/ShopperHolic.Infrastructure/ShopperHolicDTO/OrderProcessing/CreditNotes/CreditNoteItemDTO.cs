using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class CreditNoteItemDTO
    {
        public int CreditNoteID { get; set; }
        public int CreditNoteItemID { get; set; }
        public int OrderID { get; set; }
        public int RMAID { get; set; }
        public DateTime CreditDate { get; set; }
        public string ItemDescription { get; set; }
        public int CreditQty { get; set; }
        public decimal ItemPrice { get; set; }
        public decimal CreditItemTotal { get; set; }
        public string CreditNoteItemStatus { get; set; }
        public string CreditNoteStatus { get; set; }
        public string CustomerName { get; set; }
        public string ItemCode { get; set; }
    }
}