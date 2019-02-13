using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class OrderService : BaseService, IOrderService
    {
        public OrderService(string connectionString) : base(connectionString) { }
        internal OrderService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public OrderDetailedDTO Create(CreateOrderDTO entityToCreate)
        {
            try
            {
                int newID = UOW.OrderRepo.Create(entityToCreate);
                UOW.SaveChanges();
                return GetByID(newID);
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public OrderDetailedDTO GetByID(int id)
        {
            return new OrderDetailedDTO()
            {
                Header = UOW.OrderRepo.GetByID(id),
                Items = UOW.OrderRepo.GetItemsForOrder(id),
                DeliveryNotes = UOW.DeliveryNoteRepo.GetDeliveryNotesForOrder(id),
                Invoices = UOW.InvoiceRepo.GetInvoicesForOrder(id)
            };
        }
        public IEnumerable<OrderPreviewDTO> GetAllPreview()
        {
            return UOW.OrderRepo.GetAllPreview();
        }
        public OrderDetailedDTO Update(UpdatedOrderDTO updatedRecord)
        {
            try
            {
                var updateResult = UOW.OrderRepo.Update(updatedRecord);
                UOW.SaveChanges();
                return GetByID(updateResult.OrderID);
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public bool Delete(int id)
        {
            try
            {
                bool result = UOW.OrderRepo.Delete(id);
                UOW.SaveChanges();
                return result;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public OrderItemDTO GetOrderItemByID(int orderItemID)
        {
            return UOW.OrderRepo.GetOrderItemByID(orderItemID);
        }
        public IEnumerable<OrderItemDTO> GetItemsForOrder(int id)
        {
            return UOW.OrderRepo.GetItemsForOrder(id);
        }
        public OrderItemDTO AddItemToOrder(CreateOrderItemDTO entityToCreate)
        {
            try
            {
                var orderItemID = UOW.OrderRepo.AddItemToOrder(entityToCreate);
                UOW.SaveChanges();
                return UOW.OrderRepo.GetOrderItemByID(orderItemID);
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }

        public OrderItemDTO UpdateOrderItem(UpdateOrderItemDTO updatedRecord)
        {
            try
            {
                OrderItemDTO returnModel = UOW.OrderRepo.UpdateOrderItem(updatedRecord);
                UOW.SaveChanges();
                return returnModel;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }

        public bool RemoveItemFromOrder(int orderItemID)
        {
            try
            {
                var result = UOW.OrderRepo.RemoveItemFromOrder(orderItemID);
                UOW.SaveChanges();
                return result;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
    }
}