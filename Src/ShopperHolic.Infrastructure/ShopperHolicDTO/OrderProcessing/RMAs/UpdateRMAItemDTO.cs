using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class UpdateRMAItemDTO
    {
        public int RMAItemID { get; set; }
        public int ReturnQty { get; set; }
        public bool ReturnToInventory { get; set; }
        public string ReturnReason { get; set; }
    }
}