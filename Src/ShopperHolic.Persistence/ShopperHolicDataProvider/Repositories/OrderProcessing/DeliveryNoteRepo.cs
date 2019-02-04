using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class DeliveryNoteRepo : BaseRepo, IDeliveryNoteRepo
    {
        public DeliveryNoteRepo(IDbTransaction transaction) : base(transaction) { }

        public int DeliverOrder(int orderID)
        {
            try
            {
                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderHeaderID", orderID);
                int deliveryNoteID = Connection.QueryFirst<int>("DeliverExistingItems", queryParameters, CurrentTrans, commandType: CommandType.StoredProcedure);
                return deliveryNoteID;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<DeliveryNoteItemDTO> GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT DeliveryNoteItemID,dn.DeliveryNoteID,oh.OrderHeaderID,dn.DeliveryDate,
                  oi.OrderItemID,oi.OrderItemDescription,oi.OrderItemQty,c.CustomerName, i.ItemCode
                FROM DeliveryNotes dn
                INNER JOIN DeliveryNoteItems dni ON dn.DeliveryNoteID = dni.DeliveryNoteID
                INNER JOIN OrderItems oi ON oi.OrderItemID = dni.OrderItemID
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = oi.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                INNER JOIN Items i ON i.ItemID = oi.ItemID
                WHERE dn.DeliveryNoteID = @DeliveryNoteID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@DeliveryNoteID", id);

                return Connection.Query<DeliveryNoteItemDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<DeliveryNotePreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT dn.DeliveryNoteID,oh.OrderHeaderID,dn.DeliveryDate,c.CustomerName
                FROM DeliveryNotes dn
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = dn.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID";

                return Connection.Query<DeliveryNotePreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<DeliveryNotePreviewDTO> GetDeliveryNotesForOrder(int orderID)
        {
            try
            {
                string query = @"
                SELECT dn.DeliveryNoteID,oh.OrderHeaderID,dn.DeliveryDate,c.CustomerName
                FROM DeliveryNotes dn
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = dn.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                WHERE oh.OrderHeaderID = @OrderID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderID", orderID);

                return Connection.Query<DeliveryNotePreviewDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}
