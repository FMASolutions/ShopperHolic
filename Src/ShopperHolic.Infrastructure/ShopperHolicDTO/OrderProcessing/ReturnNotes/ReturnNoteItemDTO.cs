using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class ReturnNoteItemDTO
    {
        public int ReturnNoteItemID { get; set; }
        public int ReturnNoteID { get; set; }
        public int RMAID { get; set; }
        public int OrderID { get; set; }
        public DateTime ReturnedDate { get; set; }
        public int OrderItemID { get; set; }
        public string OrderItemDescription { get; set; }
        public int ReturnQty { get; set; }
        public string CustomerName { get; set; }
        public string ItemCode { get; set; }
    }
}