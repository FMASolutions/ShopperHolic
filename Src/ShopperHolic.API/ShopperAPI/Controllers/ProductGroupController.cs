using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Stock;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using Newtonsoft.Json;
using System;
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

        [HttpPost]
        public ActionResult<ProductGroupDTO> Create([FromBody] ProductGroupCreateDTO userInput)
        {
            try { return _prodGroupManager.Create(userInput); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<ProductGroupDTO> GetByID([FromQuery] int id)
        {
            try { return  _prodGroupManager.GetyByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<ProductGroupPreviewDTO>> GetAll()
        {
            try
            {
                List<ProductGroupPreviewDTO> returnList = new List<ProductGroupPreviewDTO>();
                foreach (var result in  _prodGroupManager.GetAllPreview())
                    returnList.Add(result);
                return returnList;
            }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

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

        private ProductGroupManager _prodGroupManager;
    }
}