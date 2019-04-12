using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class OrderItemDTO
    {
        public int OrderItemID { get; set; }
        public int OrderID { get; set; }
        public int ItemID { get; set; }
        public int OrderItemStatusID { get; set; }
        public decimal OrderItemUnitPrice { get; set; }
        public decimal OrderItemUnitPriceAfterDiscount { get; set; }
        public int OrderItemQty { get; set; }
        public string OrderItemDescription { get; set; }
        public string OrderItemStatusText { get; set; }
        public decimal OrderItemTotal { get; set; }
        public string ItemCode {get;set;}
        public int AllowedReturnQty {get;set;}
    }
}