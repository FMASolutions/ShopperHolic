using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class CreditNotePreviewDTO
    {
        public int CreditNoteID { get; set; }
        public int RMAID { get; set; }
        public int OrderID { get; set; }
        public string CreditNoteStatus { get; set; }
        public DateTime CreditNoteDate { get; set; }
        public decimal CreditTotal { get; set; }
        public string CustomerName { get; set; }
    }
}