using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Stock;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.API.ShopperAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        public ContentController(IContentService ContentService)
        {
            _contentManager = new ContentManager(ContentService);
        }

        private ContentManager _contentManager;

        [HttpGet]
        public ActionResult<AboutPageDTO> GetAboutPage()
        {
            try { return _contentManager.GetAboutPage(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<ContactPageDTO> GetContactPage()
        {
            try { return _contentManager.GetContactPage(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<LandingPageWithItemsDTO> GetLandingPage()
        {
            try { return _contentManager.GetLandingPage(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<SiteConfigDTO> GetSiteConfig()
        {
            try { return _contentManager.GetSiteConfig(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "IsAdminUser")]
        [HttpPut]
        public ActionResult<AboutPageDTO> UpdateAboutPage([FromBody] AboutPageDTO newPage)
        {
            try { return _contentManager.UpdateAboutPage(newPage); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "IsAdminUser")]
        [HttpPut]
        public ActionResult<ContactPageDTO> UpdateContactPage([FromBody] ContactPageDTO newPage)
        {
            try { return _contentManager.UpdateContactPage(newPage); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "IsAdminUser")]
        [HttpPut]
        public ActionResult<LandingPageDTO> UpdateLandingPage([FromBody] LandingPageDTO newPage)
        {
            try { return _contentManager.UpdateLandingPage(newPage); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "IsAdminUser")]
        [HttpPut]
        public ActionResult<SiteConfigDTO> UpdateSiteConfig([FromBody] SiteConfigDTO newPage)
        {
            try { return _contentManager.UpdateSiteConfig(newPage); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}