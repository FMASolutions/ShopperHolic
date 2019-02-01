using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class CreateOrderDTO
    {
        public int CustomerID { get; set; }
        public int AddressID { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }
    }
}