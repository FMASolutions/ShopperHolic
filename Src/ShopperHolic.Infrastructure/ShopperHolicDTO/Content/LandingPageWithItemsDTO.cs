using System.Collections.Generic;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class LandingPageWithItemsDTO
    {
        public LandingPageWithItemsDTO()
        {
            PageInfo = new LandingPageDTO();
        }
        public LandingPageDTO PageInfo;
        public IEnumerable<ItemDetailedDTO> FeaturedItems;
    }
}


