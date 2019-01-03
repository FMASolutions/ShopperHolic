using System;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Entities
{
    public class Item
    {
        public Item()
        {

        }
        public Item(Int32 subGroupID, string itemCode, string itemName, string itemDescription,decimal itemUnitPrice, decimal itemUnitPriceWithMaxDiscount, int itemAvailableQty, int itemReorderQtyReminder, string itemImageFilename, Int32 itemID = 0)
        {
            ItemID = itemID;
            ItemCode = itemCode;
            SubGroupID = subGroupID;
            ItemName = itemName;
            ItemDescription = itemDescription;
            ItemUnitPrice = itemUnitPrice;
            ItemUnitPriceWithMaxDiscount = itemUnitPriceWithMaxDiscount;
            ItemAvailableQty = itemAvailableQty;
            ItemReorderQtyReminder = itemReorderQtyReminder;
            ItemImageFilename = itemImageFilename;
        }
        public int ItemID { get; internal set; }
        public string ItemCode { get; set; }
        public int SubGroupID { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public decimal ItemUnitPrice {get;set;}
        public decimal ItemUnitPriceWithMaxDiscount { get; set; }
        public int ItemAvailableQty { get; set; }
        public int ItemReorderQtyReminder { get; set; }
        public string ItemImageFilename { get; set; }
    }
}