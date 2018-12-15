using System;
namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Entities
{
    public class ProductGroup
    {
        public ProductGroup()
        {
            
        } 
        public ProductGroup(string productGroupCode, string productGroupName, string productGroupDescription, Int32 productGroupID = 0)
        {
            ProductGroupID = productGroupID;
            ProductGroupCode = productGroupCode;
            ProductGroupName = productGroupName;            
            ProductGroupDescription = productGroupDescription;
        }
        public Int32 ProductGroupID { get; internal set; }
        public string ProductGroupDescription { get; set;}
        public string ProductGroupName { get; set;}
        public string ProductGroupCode { get; set;}
    }
}