using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IOrderRepo
    {
        int Create(CreateOrderDTO entityToCreate);
        OrderDTO GetByID(int id);
        IEnumerable<OrderPreviewDTO> GetAllPreview();
        OrderDTO Update(UpdatedOrderDTO updatedRecord);
        bool Delete(int id);
        OrderItemDTO GetOrderItemByID(int orderItemID);
        IEnumerable<OrderItemDTO> GetItemsForOrder(int id);
        IEnumerable<OrderItemDTO> GetReturnableItemsForOrder(int orderID);
        int AddItemToOrder(CreateOrderItemDTO entityToCreate);
        OrderItemDTO UpdateOrderItem(UpdateOrderItemDTO updatedRecord);
        bool RemoveItemFromOrder(int orderItemID);
    }
}
