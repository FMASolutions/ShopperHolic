using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class CreateOrderItemDTO
    {
        public int OrderID { get; set; }
        public int ItemID { get; set; }
        public decimal OrderItemUnitPrice { get; set; }
        public decimal OrderItemUnitPriceAfterDiscount { get; set; }
        public decimal OrderItemQty { get; set; }
        public string OrderItemDescription { get; set; }
    }
}