using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Stock;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.API.ShopperAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductGroupController : ControllerBase
    {
        public ProductGroupController(IProductGroupService prodGroupService)
        {
            _prodGroupManager = new ProductGroupManager(prodGroupService);
        }

        private ProductGroupManager _prodGroupManager;

        [Authorize(Policy = "UserCanCreateProductGroup")]
        [HttpPost]
        public ActionResult<ProductGroupDTO> Create([FromBody] ProductGroupCreateDTO userInput)
        {
            try { return _prodGroupManager.Create(userInput); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<ProductGroupDTO> GetByID([FromQuery] int id)
        {
            try { return  _prodGroupManager.GetByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<ProductGroupPreviewDTO>> GetAll()
        {
            try { return _prodGroupManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanEditProductGroup")]
        [HttpPut]
        public ActionResult<ProductGroupDTO> Update([FromBody] ProductGroupDTO newModel)
        {
            try { return _prodGroupManager.Update(newModel); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteProductGroup")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try{return _prodGroupManager.Delete(id);}
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}