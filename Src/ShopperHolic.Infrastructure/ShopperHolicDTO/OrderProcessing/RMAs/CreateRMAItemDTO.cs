using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class CreateRMAItemDTO
    {
        public int RMAID {get;set;}
        public int OrderItemID { get; set; }
        public decimal ReturnQty { get; set; }
        public bool ReturnToInventory {get;set;}
        public string ReturnReason {get; set;}
    }
}