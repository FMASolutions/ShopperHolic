using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class ContentService : BaseService, IContentService
    {
        public ContentService(string connectionString) : base(connectionString) { }
        internal ContentService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public SiteConfigDTO GetSiteConfig()
        {
            var returnDTO = new SiteConfigDTO();
            returnDTO.AppConfig = UOW.ContentRepo.GetBasicSiteConfig();
            returnDTO.AboutPage = UOW.ContentRepo.GetAboutPage();
            returnDTO.ContactPage = UOW.ContentRepo.GetContactPage();
            returnDTO.LandingPage.PageInfo = UOW.ContentRepo.GetLandingPage();
            returnDTO.LandingPage.FeaturedItems = UOW.ItemRepo.GetFeaturedItems();
            return returnDTO;
        }
        public AboutPageDTO UpdateAboutPage(AboutPageDTO newPage)
        {
            try
            {
                var returnModel = UOW.ContentRepo.UpdateAboutPage(newPage);
                UOW.SaveChanges();
                return returnModel;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public ContactPageDTO UpdateContactPage(ContactPageDTO newPage)
        {
            try
            {
                var returnModel = UOW.ContentRepo.UpdateContactPage(newPage);
                UOW.SaveChanges();
                return returnModel;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public LandingPageDTO UpdateLandingPage(LandingPageDTO newPage)
        {
            try
            {
                var returnModel = UOW.ContentRepo.UpdateLandingPage(newPage);
                UOW.SaveChanges();
                return returnModel;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public BasicSiteConfigDTO UpdateSiteConfig(BasicSiteConfigDTO newPage)
        {
            try
            {
                var returnModel = UOW.ContentRepo.UpdateSiteConfig(newPage);
                UOW.SaveChanges();
                return returnModel;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }

    }
}