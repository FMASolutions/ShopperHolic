using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IContentRepo
    {
        AboutPageDTO GetAboutPage();
        ContactPageDTO GetContactPage();
        LandingPageDTO GetLandingPage();
        SiteConfigDTO GetSiteConfig();
        AboutPageDTO UpdateAboutPage(AboutPageDTO newPage);
        ContactPageDTO UpdateContactPage(ContactPageDTO newPage);
        LandingPageDTO UpdateLandingPage(LandingPageDTO newPage);
        SiteConfigDTO UpdateSiteConfig(SiteConfigDTO newPage);
    }
}