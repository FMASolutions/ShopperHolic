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
    public class DeliveryNoteController : ControllerBase
    {
        public DeliveryNoteController(IDeliveryNoteService deliveryNoteService)
        {
            _deliveryNoteManager = new DeliveryNoteManager(deliveryNoteService);
        }

        private DeliveryNoteManager _deliveryNoteManager;

        [HttpGet]
        public ActionResult<List<DeliveryNoteDTO>> DeliverOrder([FromQuery] int orderID)
        {
            try { return _deliveryNoteManager.DeliverOrder(orderID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<DeliveryNoteDTO>> GetByID([FromQuery] int id)
        {
            try { return _deliveryNoteManager.GetByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<DeliveryNotePreviewDTO>> GetAllPreview()
        {
            try { return _deliveryNoteManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}