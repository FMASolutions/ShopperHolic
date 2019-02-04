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
            try
            {
                string query = @"
                INSERT INTO OrderHeaders (CustomerID, AddressID, OrderStatusID, OrderDate, DeliveryDate)
                VALUES(@CustomerID, @AddressID, 1, @OrderDate, @DeliveryDate)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CustomerID", entityToCreate.CustomerID);
                queryParameters.Add("@AddressID", entityToCreate.AddressID);
                queryParameters.Add("@OrderDate", entityToCreate.OrderDate);
                queryParameters.Add("@DeliveryDate", entityToCreate.DeliveryDate);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public OrderDTO GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT oh.OrderHeaderID AS [OrderID], oh.CustomerID, oh.AddressID,oh.OrderStatusID,
                  OrderDate, DeliveryDate, AddressLine1, AddressLine2, CityAreaName, CityName, 
                  PostCode, CountryName, CustomerName, os.OrderstatusValue AS [OrderStatusText]
                FROM OrderHeaders oh
                INNER JOIN OrderStatus os ON os.OrderStatusID = oh.OrderStatusID
                INNER JOIN Customers cust ON oh.CustomerID = cust.CustomerID
                INNER JOIN AddressLocations addloc on addloc.AddressLocationID = oh.AddressID
                INNER JOIN CityAreas ca ON ca.CityAreaID = addloc.CityAreaID
                INNER JOIN Cities cit ON cit.CityID = ca.CityID
                INNER JOIN Countries co ON co.CountryID = cit.CountryID
                WHERE oh.OrderHeaderID = @OrderID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderID", id);

                return Connection.QueryFirst<OrderDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<OrderPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT oh.OrderHeaderID AS [OrderID], CustomerName, os.OrderstatusValue AS [OrderStatusText], oh.DeliveryDate
                FROM OrderHeaders oh
                INNER JOIN Customers c ON oh.CustomerID = c.CustomerID
                INNER JOIN OrderStatus os ON oh.OrderStatusID = os.OrderStatusID";

                return Connection.Query<OrderPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public OrderDTO Update(UpdatedOrderDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE OrderHeaders
                SET CustomerID = @CustomerID,
                  AddressID = @AddressID,
                  OrderDate = @OrderDate,
                  DeliveryDate = @DeliveryDate
                WHERE OrderHeaderID = @OrderID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CustomerID", updatedRecord.CustomerID);
                queryParameters.Add("@AddressID", updatedRecord.AddressID);
                queryParameters.Add("@OrderDate", updatedRecord.OrderDate);
                queryParameters.Add("@DeliveryDate", updatedRecord.DeliveryDate);
                queryParameters.Add("@OrderID", updatedRecord.OrderID);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetByID(updatedRecord.OrderID) : throw noRecordEX;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                string query = @"
                DELETE FROM OrderItems
                WHERE OrderHeaderID = @OrderID
                
                DELETE FROM OrderHeaders
                WHERE OrderHeaderID = @OrderID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderID", id);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public OrderItemDTO GetOrderItemByID(int orderItemID)
        {
            try
            {
                string query = @"
                SELECT OrderItemID, oi.OrderHeaderID AS [OrderID], i.ItemID, OrderItemStatusID, 
                  OrderItemUnitPrice, OrderItemUnitPriceAfterDiscount, OrderItemQty, i.ItemCode,
                  OrderItemDescription, os.OrderstatusValue AS [OrderItemStatusText], 
                  oi.OrderItemUnitPriceAfterDiscount * oi.OrderItemQty AS [OrderItemTotal]
                FROM OrderItems oi
                INNER JOIN Items i ON i.ItemID = oi.ItemID
                INNER JOIN OrderStatus os ON os.OrderStatusID = oi.OrderItemStatusID
                WHERE oi.OrderItemID = @OrderItemID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderItemID", orderItemID);

                return Connection.QueryFirst<OrderItemDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<OrderItemDTO> GetItemsForOrder(int id)
        {
            try
            {
                string query = @"
                SELECT OrderItemID, oi.OrderHeaderID AS [OrderID], i.ItemID, OrderItemStatusID, 
                  OrderItemUnitPrice, OrderItemUnitPriceAfterDiscount, OrderItemQty, i.ItemCode,
                  OrderItemDescription, os.OrderstatusValue AS [OrderItemStatusText], 
                  oi.OrderItemUnitPriceAfterDiscount * oi.OrderItemQty AS [OrderItemTotal]
                FROM OrderItems oi
                INNER JOIN Items i ON i.ItemID = oi.ItemID
                INNER JOIN OrderStatus os ON os.OrderStatusID = oi.OrderItemStatusID
                WHERE OrderHeaderID = @OrderID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderID", id);

                return Connection.Query<OrderItemDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public int AddItemToOrder(CreateOrderItemDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO OrderItems (OrderHeaderID, ItemID, OrderItemStatusID, OrderItemUnitPrice, OrderItemUnitPriceAfterDiscount, OrderItemQty, OrderItemDescription)
                VALUES(@OrderID, @ItemID, 1, @OrderItemUnitPrice, @OrderItemUnitPriceAfterDiscount, @OrderItemQty, @OrderItemDescription)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderID", entityToCreate.OrderID);
                queryParameters.Add("@ItemID", entityToCreate.ItemID);
                queryParameters.Add("@OrderItemUnitPrice", entityToCreate.OrderItemUnitPrice);
                queryParameters.Add("@OrderItemUnitPriceAfterDiscount", entityToCreate.OrderItemUnitPriceAfterDiscount);
                queryParameters.Add("@OrderItemQty", entityToCreate.OrderItemQty);
                queryParameters.Add("@OrderItemDescription", entityToCreate.OrderItemDescription);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public OrderItemDTO UpdateOrderItem(UpdateOrderItemDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE OrderItems
                SET ItemID = @ItemID,
                    OrderItemUnitPrice = @OrderItemUnitPrice,
                    OrderItemUnitPriceAfterDiscount = @OrderItemUnitPriceAfterDiscount,
                    OrderItemQty = @OrderItemQty,
                    OrderItemDescription = @OrderItemDescription
                WHERE OrderItemID = @OrderItemID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ItemID", updatedRecord.ItemID);
                queryParameters.Add("@OrderItemDescription", updatedRecord.OrderItemDescription);
                queryParameters.Add("@OrderItemID", updatedRecord.OrderItemID);
                queryParameters.Add("@OrderItemQty", updatedRecord.OrderItemQty);
                queryParameters.Add("@OrderItemUnitPrice", updatedRecord.OrderItemUnitPrice);
                queryParameters.Add("@OrderItemUnitPriceAfterDiscount", updatedRecord.OrderItemUnitPriceAfterDiscount);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetOrderItemByID(updatedRecord.OrderItemID) : throw noRecordEX;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public bool RemoveItemFromOrder(int orderItemID)
        {
            try
            {
                string query = @"
                DELETE FROM OrderItems
                WHERE OrderItemID = @OrderItemID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderItemID", orderItemID);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}
