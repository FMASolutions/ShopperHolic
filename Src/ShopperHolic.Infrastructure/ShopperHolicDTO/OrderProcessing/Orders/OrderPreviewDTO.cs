using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class OrderPreviewDTO
    {
        public int OrderID {get;set;}
        public string CustomerName {get;set;}
        public string OrderStatusText {get;set;}
        public string DeliveryDate {get;set;}
    }
}