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
    public class OrderController : ControllerBase
    {
        public OrderController(IOrderService orderService)
        {
            _orderManager = new OrderManager(orderService);
        }

        private OrderManager _orderManager;


        [HttpPost]
        public ActionResult<OrderDetailedDTO> Create(CreateOrderDTO entityToCreate)
        {
            try { return _orderManager.Create(entityToCreate); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<OrderDetailedDTO> GetByID([FromQuery] int id)
        {
            try { return _orderManager.GetByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<OrderPreviewDTO>> GetAll()
        {
            try { return _orderManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpPut]
        public ActionResult<OrderDetailedDTO> Update(UpdatedOrderDTO updatedRecord)
        {
            try { return _orderManager.Update(updatedRecord); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteOrder")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try { return _orderManager.Delete(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<OrderItemDTO> GetOrderItemByID([FromQuery] int orderItemID)
        {
            try { return _orderManager.GetOrderItemByID(orderItemID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<OrderItemDTO>> GetItemsForOrder([FromQuery] int id)
        {
            try { return _orderManager.GetItemsForOrder(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpPost]
        public ActionResult<OrderItemDTO> AddItemToOrder(CreateOrderItemDTO entityToCreate)
        {
            try { return _orderManager.AddItemToOrder(entityToCreate); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpPut]
        public ActionResult<OrderItemDTO> UpdateOrderItem(UpdateOrderItemDTO updatedRecord)
        {
            try { return _orderManager.UpdateOrderItem(updatedRecord); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete]
        public ActionResult<bool> RemoveItemFromOrder([FromQuery] int orderItemID)
        {
            try { return _orderManager.RemoveItemFromOrder(orderItemID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}