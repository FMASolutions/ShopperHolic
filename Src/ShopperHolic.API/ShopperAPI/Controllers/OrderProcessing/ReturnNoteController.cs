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
    public class ReturnNoteController : ControllerBase
    {
        public ReturnNoteController(IReturnNoteService returnNoteService)
        {
            _returnNoteManager = new ReturnNoteManager(returnNoteService);
        }

        private ReturnNoteManager _returnNoteManager;

        [Authorize(Policy = "UserCanProcessReturn")]
        [HttpPut]
        public ActionResult<List<ReturnNoteItemDTO>> ProcessReturn([FromQuery] int rmaID)
        {
            try { return _returnNoteManager.ProcessReturn(rmaID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<ReturnNoteItemDTO>> GetByID([FromQuery] int returnNoteID)
        {
            try { return _returnNoteManager.GetByID(returnNoteID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<ReturnNotePreviewDTO>> GetAll()
        {
            try { return _returnNoteManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<ReturnNotePreviewDTO>> GetReturnNotesForOrder([FromQuery] int orderID)
        {
            try { return _returnNoteManager.GetReturnNotesForOrder(orderID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<ReturnNotePreviewDTO>> GetReturnNotesForRMA([FromQuery] int rmaID)
        {
            try { return _returnNoteManager.GetReturnNotesForRMA(rmaID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}