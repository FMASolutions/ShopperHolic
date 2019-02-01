using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class OrderDTO
    {
        public int OrderID { get; set; }
        public int CustomerID { get; set; }
        public int AddressID { get; set; }
        public int OrderStatusID { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string CityAreaName { get; set; }
        public string CityName { get; set; }
        public string PostCode { get; set; }
        public string CountryName { get; set; }
        public string CustomerName { get; set; }
        public string OrderStatusText { get; set; }
    }
}