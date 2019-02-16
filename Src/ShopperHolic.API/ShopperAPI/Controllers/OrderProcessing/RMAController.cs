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
    [Route("[controller]/[action]")]
    [ApiController]
    public class RMAController : ControllerBase
    {
        public RMAController(IRMAService rmaService)
        {
            _rmaManager = new RMAManager(rmaService);
        }

        private RMAManager _rmaManager;

        [HttpPost]
        public ActionResult<RMADetailedDTO> Create(CreateRMADTO entityToCreate)
        {
            try { return _rmaManager.Create(entityToCreate); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<RMADetailedDTO> GetByID([FromQuery] int rmaID)
        {
            try { return _rmaManager.GetByID(rmaID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<RMAPreviewDTO>> GetAll()
        {
            try { return _rmaManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteRMA")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int rmaID)
        {
            try { return _rmaManager.Delete(rmaID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<RMAItemDTO> GetRMAItemByID([FromQuery] int rmaItemID)
        {
            try { return _rmaManager.GetRMAItemByID(rmaItemID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<RMAItemDTO>> GetItemsForRMA([FromQuery] int rmaID)
        {
            try { return _rmaManager.GetItemsForRMA(rmaID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpPost]
        public ActionResult<RMAItemDTO> AddItemToRMA(CreateRMAItemDTO entityToCreate)
        {
            try { return _rmaManager.AddItemToRMA(entityToCreate); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpPut]
        public ActionResult<RMAItemDTO> UpdateRMAItem(UpdateRMAItemDTO updatedRecord)
        {
            try { return _rmaManager.UpdateRMAItem(updatedRecord); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete]
        public ActionResult<bool> RemoveItemFromRMA([FromQuery] int rmaItemID)
        {
            try { return _rmaManager.RemoveItemFromRMA(rmaItemID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}