using System.Collections.Generic;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class LandingPageDTO
    {
        public string PageTitle {get;set;}
        public string PageDescription {get;set;}
        public IEnumerable<ItemDetailedDTO> FeaturedItems;
    }
}