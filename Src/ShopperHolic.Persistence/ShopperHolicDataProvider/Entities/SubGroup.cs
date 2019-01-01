using System;
namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Entities
{
    public class SubGroup
    {
        public SubGroup()
        {
            
        } 
        public SubGroup(string subGroupCode, string subGroupName, string subGroupDescription, Int32 productGroupID, Int32 subGroupID = 0)
        {
            SubGroupID = subGroupID;
            SubGroupCode = subGroupCode;
            SubGroupName = subGroupName;            
            SubGroupDescription = subGroupDescription;
            ProductGroupID = productGroupID;

        }
        public Int32 SubGroupID { get; internal set; }
        public string SubGroupDescription { get; set;}
        public string SubGroupName { get; set;}
        public string SubGroupCode { get; set;}
        public Int32 ProductGroupID {get; set;}
    }
}