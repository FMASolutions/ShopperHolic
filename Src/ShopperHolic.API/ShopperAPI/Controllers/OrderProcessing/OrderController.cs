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
    public class OrderController : ControllerBase
    {
        public OrderController(IOrderService orderService)
        {
            _orderManager = new OrderManager(orderService);
        }

        private OrderManager _orderManager;

        public ActionResult<OrderDetailedDTO> Create(CreateOrderDTO entityToCreate)
        {
            try { return _orderManager.Create(entityToCreate); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
        public ActionResult<OrderDetailedDTO> GetByID(int id)
        {
            try { return  _orderManager.GetByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
        public ActionResult<List<OrderPreviewDTO>> GetAll()
        {
            try { return _orderManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
        public ActionResult<OrderDetailedDTO> Update(OrderDTO updatedRecord)
        {
            try { return _orderManager.Update(updatedRecord); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
        public ActionResult<bool> Delete(int id)
        {
            try{return _orderManager.Delete(id);}
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
        public ActionResult<OrderItemDTO> GetOrderItemByID(int orderItemID)
        {
            try { return  _orderManager.GetOrderItemByID(orderItemID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
        public ActionResult<List<OrderItemDTO>> GetItemsForOrder(int id)
        {
            try { return  _orderManager.GetItemsForOrder(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
        public ActionResult<OrderItemDTO> AddItemToOrder(CreateOrderItemDTO entityToCreate)
        {
            try { return  _orderManager.AddItemToOrder(entityToCreate); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
        public ActionResult<bool> RemoveItemFromOrder(int orderItemID)
        {
            try { return  _orderManager.RemoveItemFromOrder(orderItemID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}