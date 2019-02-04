namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class ItemDetailedDTO
    {
        public int ItemID { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public decimal ItemUnitPrice { get; set; }
        public decimal ItemUnitPriceWithMaxDiscount { get; set; }
        public int ItemAvailableQty { get; set; }
        public int ItemReorderQtyReminder { get; set; }
        public string ItemImageFilename { get; set; }
        public int SubGroupID { get; set; }
        public string SubGroupCode { get; set; }
        public string SubGroupName { get; set; }
        public string SubGroupDescription { get; set; }
        public int ProductGroupID { get; set; }
        public string ProductGroupCode { get; set; }
        public string ProductGroupName { get; set; }
        public string ProductGroupDescription { get; set; }
        public bool IsFeaturedItem {get; set;}
    }
}