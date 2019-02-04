namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class ItemDTO
    {
        public int ItemID { get; set; }
        public string ItemCode { get; set; }
        public int SubGroupID { get; set; }
        public string SubGroupText { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public decimal ItemUnitPrice { get; set; }
        public decimal ItemUnitPriceWithMaxDiscount { get; set; }
        public int ItemAvailableQty { get; set; }
        public int ItemReorderQtyReminder { get; set; }
        public string ItemImageFilename { get; set; }
        public bool IsFeaturedItem {get; set;}

    }
}