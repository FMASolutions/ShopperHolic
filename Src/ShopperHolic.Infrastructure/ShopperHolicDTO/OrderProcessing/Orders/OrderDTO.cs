using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class OrderDTO
    {
        public int OrderID {get;set;}
        public int CustomerID {get;set;}
        public int AddressID {get;set;}
        public int OrderStatusID {get;set;}
        public DateTime OrderDate {get;set;}
        public DateTime DeliveryDate {get;set;}
        public string AddressText {get;set;}
        public string CustomerText {get;set;}
        public string OrderStatusText {get;set;}
    }
}