using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class ContentManager : IDisposable
    {
        public ContentManager(IContentService service)
        {
            _contentService = service;
        }

        public void Dispose()
        {
            _contentService.Dispose();
        }

        private IContentService _contentService;

        public AboutPageDTO GetAboutPage()
        {
            return _contentService.GetSiteConfig().AboutPage;
        }
        public ContactPageDTO GetContactPage()
        {
            return _contentService.GetSiteConfig().ContactPage;
        }
        public LandingPageWithItemsDTO GetLandingPage()
        {
            return _contentService.GetSiteConfig().LandingPage;
        }
        public SiteConfigDTO GetSiteConfig()
        {
            return _contentService.GetSiteConfig();
        }
        public AboutPageDTO UpdateAboutPage(AboutPageDTO newPage)
        {
            return _contentService.UpdateAboutPage(newPage);
        }
        public ContactPageDTO UpdateContactPage(ContactPageDTO newPage)
        {
            return _contentService.UpdateContactPage(newPage);
        }
        public LandingPageDTO UpdateLandingPage(LandingPageDTO newPage)
        {
            return _contentService.UpdateLandingPage(newPage);
        }
        public BasicSiteConfigDTO UpdateSiteConfig(BasicSiteConfigDTO newPage)
        {
            return _contentService.UpdateSiteConfig(newPage);
        }

    }
}