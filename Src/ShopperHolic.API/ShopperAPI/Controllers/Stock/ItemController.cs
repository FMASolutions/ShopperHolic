using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using ShopperHolic.API.ShopperAPI.Models.Stock;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.API.ShopperAPI.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IHostingEnvironment _environment;
        public ItemController(IItemService itemService, IHostingEnvironment env)
        {
            _itemManager = new ItemManager(itemService);
            _environment = env;
        }

        private ItemManager _itemManager;

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
            try { return _itemManager.GetByID(id); }
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

        [HttpPost, DisableRequestSizeLimit]
        public ActionResult<bool> UploadImage()
        {
            try
            {
            var file = Request.Form.Files[0];
            var id = int.Parse(Request.Form["id"]);
            
            _itemManager.StoreAndUpdateItemImage(file,id,_environment);

            return true;
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}