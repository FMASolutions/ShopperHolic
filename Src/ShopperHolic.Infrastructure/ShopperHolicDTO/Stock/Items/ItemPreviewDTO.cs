namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class ItemPreviewDTO
    {
        public int ItemID { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string ItemImageFilename { get; set; }
        public int SubGroupID { get; set; }
        public decimal ItemUnitPrice { get; set; }
        public bool IsFeaturedItem {get; set;}
    }
}