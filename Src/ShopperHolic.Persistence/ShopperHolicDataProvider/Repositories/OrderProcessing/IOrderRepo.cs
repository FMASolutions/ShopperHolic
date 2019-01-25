using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IOrderRepo
    {
        int Create(CreateOrderDTO entityToCreate);
        OrderDTO GetByID(int id);
        IEnumerable<OrderPreviewDTO> GetAllPreview();
        OrderDTO Update(OrderDTO updatedRecord);
        bool Delete(int id);
        OrderItemDTO GetOrderItemByID(int orderItemID);
        IEnumerable<OrderItemDTO> GetItemsForOrder(int id);
        int AddItemToOrder(CreateOrderItemDTO entityToCreate);
        bool RemoveItemFromOrder(int orderItemID);
    }
}
