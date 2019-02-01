using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class UpdatedOrderDTO
    {
        public int OrderID {get;set;}
        public int CustomerID {get;set;}
        public int AddressID {get;set;}
        public DateTime OrderDate {get;set;}
        public DateTime DeliveryDate {get;set;}   
    }
}