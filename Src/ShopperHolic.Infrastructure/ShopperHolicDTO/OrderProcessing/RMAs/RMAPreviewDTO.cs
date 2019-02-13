using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class RMAPreviewDTO
    {
        public int RMAID { get; set; }
        public int OrderID { get; set; }
        public string CustomerName { get; set; }
        public string RMAStatusText { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}