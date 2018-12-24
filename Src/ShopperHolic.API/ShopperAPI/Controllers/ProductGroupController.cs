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
            try
            {
                var result = _prodGroupManager.Create(userInput);
                return result;
            }
            catch (KeyAlreadyExists ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<ProductGroupDTO> GetByID([FromQuery] int id)
        {
            var searchResult = _prodGroupManager.GetyByID(id);
            if (searchResult != null && searchResult.ProductGroupID > 0)
                return searchResult;
            else
                return NotFound();
        }

        [HttpGet]
        public ActionResult<List<ProductGroupPreviewDTO>> GetAll()
        {
            var searchResult = _prodGroupManager.GetAllPreview();
            List<ProductGroupPreviewDTO> returnList = new List<ProductGroupPreviewDTO>();
            
            foreach(var result in searchResult)
                returnList.Add(result);
            
            if(returnList.Count > 0)
                return returnList;
            else
                return null;
        }

        [HttpPut]
        public ActionResult<ProductGroupDTO> Update([FromBody] ProductGroupDTO newModel)
        {
            try
            {
                return _prodGroupManager.Update(newModel);
            }
            catch (KeyAlreadyExists ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy="UserCanDeleteProductGroup")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try
            {
                return _prodGroupManager.Delete(id);
            }
            catch(ChildRecordExists ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        private ProductGroupManager _prodGroupManager;
    }
}