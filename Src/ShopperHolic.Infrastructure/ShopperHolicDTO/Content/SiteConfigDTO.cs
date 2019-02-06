namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class SiteConfigDTO
    {
        public SiteConfigDTO()
        {
            AppConfig = new BasicSiteConfigDTO();
            LandingPage = new LandingPageWithItemsDTO();
            AboutPage = new AboutPageDTO();
            ContactPage = new ContactPageDTO();
        }
        public BasicSiteConfigDTO AppConfig{get;set;}
        public LandingPageWithItemsDTO LandingPage {get;set;}
        public AboutPageDTO AboutPage {get;set;}
        public ContactPageDTO ContactPage {get;set;}
    }
}