using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class OrderRepo : BaseRepo, IOrderRepo
    {
        public OrderRepo(IDbTransaction transaction) : base(transaction) { }
        
        public int Create(CreateOrderDTO entityToCreate)
        {
          throw new NotImplementedException();
        }

        public OrderDTO GetByID(int id)
        {
          throw new NotImplementedException();
        }

        public IEnumerable<OrderPreviewDTO> GetAllPreview()
        {
          throw new NotImplementedException();
        }

        public OrderDTO Update(OrderDTO updatedRecord)
        {
          throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
          throw new NotImplementedException();
        }
        public IEnumerable<OrderItemDTO> GetItemsForOrder(int id)
        {
          throw new NotImplementedException();
        }
        public OrderItemDTO AddItemToOrder(CreateOrderItemDTO entityToCreate)
        {
          throw new NotImplementedException();
        }
        public bool RemoveItemFromOrder(int orderItemID)
        {
          throw new NotImplementedException();
        }
    }
}
