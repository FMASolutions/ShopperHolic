using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class RMAItemDTO
    {
        public int RMAItemID { get; set; }
        public int OrderItemID { get; set; }
        public int ReturnQty { get; set; }
        public string OrderItemDescription { get; set; }
        public string RMAItemStatus { get; set; }
        public bool ReturnToInventory { get; set; }
        public string ReturnReason { get; set; }
    }
}