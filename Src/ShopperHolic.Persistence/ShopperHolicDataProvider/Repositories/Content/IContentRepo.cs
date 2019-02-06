using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IContentRepo
    {
        AboutPageDTO GetAboutPage();
        ContactPageDTO GetContactPage();
        LandingPageDTO GetLandingPage();
        BasicSiteConfigDTO GetBasicSiteConfig();
        AboutPageDTO UpdateAboutPage(AboutPageDTO newPage);
        ContactPageDTO UpdateContactPage(ContactPageDTO newPage);
        LandingPageDTO UpdateLandingPage(LandingPageDTO newPage);
        BasicSiteConfigDTO UpdateSiteConfig(BasicSiteConfigDTO newPage);
    }
}