using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IContentService : IDisposable
    {
        AboutPageDTO GetAboutPage();
        ContactPageDTO GetContactPage();
        LandingPageWithItemsDTO GetLandingPage();
        SiteConfigDTO GetSiteConfig();
        AboutPageDTO UpdateAboutPage(AboutPageDTO newPage);
        ContactPageDTO UpdateContactPage(ContactPageDTO newPage);
        LandingPageDTO UpdateLandingPage(LandingPageDTO newPage);
        SiteConfigDTO UpdateSiteConfig(SiteConfigDTO newPage);
    }
}