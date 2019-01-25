using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IOrderService : IDisposable
    {
        OrderDetailedDTO Create(CreateOrderDTO entityToCreate);
        OrderDetailedDTO GetByID(int id);
        IEnumerable<OrderPreviewDTO> GetAllPreview();
        OrderDetailedDTO Update(OrderDTO updatedRecord);
        bool Delete(int id);
        OrderItemDTO GetOrderItemByID(int orderItemID);
        IEnumerable<OrderItemDTO> GetItemsForOrder(int id);
        OrderItemDTO AddItemToOrder(CreateOrderItemDTO entityToCreate);
        bool RemoveItemFromOrder(int orderItemID);
    }
}