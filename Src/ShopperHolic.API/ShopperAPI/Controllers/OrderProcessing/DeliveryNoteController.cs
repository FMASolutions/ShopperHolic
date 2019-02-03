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
    public class DeliveryNoteController : ControllerBase
    {
        public DeliveryNoteController(IDeliveryNoteService deliveryNoteService)
        {
            _deliveryNoteManager = new DeliveryNoteManager(deliveryNoteService);
        }

        private DeliveryNoteManager _deliveryNoteManager;

        [Authorize(Policy = "UserCanDeliverOrder")]
        [HttpPut]
        public ActionResult<List<DeliveryNoteItemDTO>> DeliverOrder([FromQuery]int orderID)
        {
            try { return _deliveryNoteManager.DeliverOrder(orderID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<DeliveryNoteItemDTO>> GetByID([FromQuery] int deliveryNoteID)
        {
            try { return _deliveryNoteManager.GetByID(deliveryNoteID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<DeliveryNotePreviewDTO>> GetAll()
        {
            try { return _deliveryNoteManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}