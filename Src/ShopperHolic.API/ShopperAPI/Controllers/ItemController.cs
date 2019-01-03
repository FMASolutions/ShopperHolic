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
    public class ItemController : ControllerBase
    {
        public ItemController(IItemService itemService)
        {
            _itemManager = new ItemManager(itemService);
        }

        [Authorize(Policy = "UserCanCreateItem")]
        [HttpPost]
        public ActionResult<ItemDTO> Create([FromBody] ItemCreateDTO userInput)
        {
            try { return _itemManager.Create(userInput); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<ItemDTO> GetByID([FromQuery] int id)
        {
            try { return _itemManager.GetyByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<ItemPreviewDTO>> GetAll()
        {
            try { return _itemManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanEditItem")]
        [HttpPut]
        public ActionResult<ItemDTO> Update([FromBody] ItemDTO newModel)
        {
            try { return _itemManager.Update(newModel); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteItem")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try { return _itemManager.Delete(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        private ItemManager _itemManager;
    }
}