using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class OrderManager : IDisposable
    {
        public OrderManager(IOrderService service)
        {
            _orderService = service;
        }

        public void Dispose()
        {
            _orderService.Dispose();
        }

        private IOrderService _orderService;

        public OrderDetailedDTO Create(CreateOrderDTO entityToCreate)
        {
            return _orderService.Create(entityToCreate);
        }
        public OrderDetailedDTO GetByID(int id)
        {
            return _orderService.GetByID(id);
        }
        public List<OrderPreviewDTO> GetAllPreview()
        {
            var searchResult = _orderService.GetAllPreview();
            var returnList = new List<OrderPreviewDTO>();
            foreach(var current in searchResult)
                returnList.Add(current);
            return returnList;
        }
        public OrderDetailedDTO Update(OrderDTO updatedRecord)
        {
            return _orderService.Update(updatedRecord);
        }
        public bool Delete(int id)
        {
            return _orderService.Delete(id);
        }
        public OrderItemDTO GetOrderItemByID(int orderItemID)
        {
            return GetOrderItemByID(orderItemID);
        }
        public List<OrderItemDTO> GetItemsForOrder(int id)
        {
            var searchResult = _orderService.GetItemsForOrder(id);
            var returnList = new List<OrderItemDTO>();
            foreach(var current in searchResult)
                returnList.Add(current);
            return returnList;
        }
        public OrderItemDTO AddItemToOrder(CreateOrderItemDTO entityToCreate)
        {
            return _orderService.AddItemToOrder(entityToCreate);
        }
        public bool RemoveItemFromOrder(int orderItemID)
        {
            return _orderService.RemoveItemFromOrder(orderItemID);
        }
    }
}