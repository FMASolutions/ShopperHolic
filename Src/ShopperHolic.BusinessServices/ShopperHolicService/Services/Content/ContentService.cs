using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class ContentService : BaseService, IContentService
    {
        public ContentService(string connectionString) : base(connectionString) { }
        internal ContentService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public AboutPageDTO GetAboutPage()
        {
            return UOW.ContentRepo.GetAboutPage();
        }
        public ContactPageDTO GetContactPage()
        {
            return UOW.ContentRepo.GetContactPage();
        }
        public LandingPageWithItemsDTO GetLandingPage()
        {
            var returnDTO = new LandingPageWithItemsDTO();
            returnDTO.PageInfo = UOW.ContentRepo.GetLandingPage();
            returnDTO.FeaturedItems = UOW.ItemRepo.GetFeaturedItems();
            return returnDTO;
        }
        public SiteConfigDTO GetSiteConfig()
        {
            return UOW.ContentRepo.GetSiteConfig();
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
        public SiteConfigDTO UpdateSiteConfig(SiteConfigDTO newPage)
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