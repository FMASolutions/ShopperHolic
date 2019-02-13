using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class ReturnNoteRepo : BaseRepo, IReturnNoteRepo
    {
        public ReturnNoteRepo(IDbTransaction transaction) : base(transaction) { }

        public int ProcessReturn(int rmaID)
        {
            try
            {
                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAHeaderID", rmaID);
                int returnNoteID = Connection.QueryFirst<int>("ProcessReturn", queryParameters, CurrentTrans, commandType: CommandType.StoredProcedure);
                return returnNoteID;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<ReturnNoteItemDTO> GetByID(int returnNoteID)
        {
            try
            {
                string query = @"
                SELECT rni.ReturnNoteItemID,rni.ReturnNoteID,rn.RMAHeaderID AS [RMAID], 
                    oi.OrderHeaderID AS [OrderID], rn.ReturnedDate, oi.OrderItemID, oi.OrderItemDescription, 
                    rmi.ReturnQty,c.CustomerName,i.ItemCode
                FROM ReturnNoteItems rni
                INNER JOIN ReturnNotes rn ON rni.ReturnNoteID = rn.ReturnNoteID
                INNER JOIN RMAItems rmi ON rmi.RMAItemID = rni.RMAItemID
                INNER JOIN OrderItems oi ON oi.OrderItemID = rmi.OrderItemID
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = oi.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                INNER JOIN Items i ON i.ItemID = oi.ItemID
                WHERE rn.ReturnNoteID = @ReturnNoteID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@ReturnNoteID", returnNoteID);

                return Connection.Query<ReturnNoteItemDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<ReturnNotePreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT rn.ReturnNoteID,oh.OrderHeaderID,rh.RMAHeaderID,rh.ReturnedDate,c.CustomerName
                FROM ReturnNotes rn
                INNER JOIN RMAHeaders rh ON rn.RMAHeaderID = rh.RMAHeaderID
                INNER JOIN OrderHeaders oh ON rh.OrderHeaderID = oh.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID";

                return Connection.Query<ReturnNotePreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<ReturnNotePreviewDTO> GetReturnNotesForOrder(int orderID)
        {
            try
            {
                string query = @"
                SELECT rn.ReturnNoteID,oh.OrderHeaderID,rh.RMAHeaderID,rh.ReturnedDate,c.CustomerName
                FROM ReturnNotes rn
                INNER JOIN RMAHeaders rh ON rn.RMAHeaderID = rh.RMAHeaderID
                INNER JOIN OrderHeaders oh ON rh.OrderHeaderID = oh.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                WHERE oh.OrderHeaderID = @OrderHeaderID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderHeaderID", orderID);

                return Connection.Query<ReturnNotePreviewDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<ReturnNotePreviewDTO> GetReturnNotesForRMA(int rmaID)
        {
            try
            {
                string query = @"
                SELECT rn.ReturnNoteID,oh.OrderHeaderID,rh.RMAHeaderID,rh.ReturnedDate,c.CustomerName
                FROM ReturnNotes rn
                INNER JOIN RMAHeaders rh ON rn.RMAHeaderID = rh.RMAHeaderID
                INNER JOIN OrderHeaders oh ON rh.OrderHeaderID = oh.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                WHERE rh.RMAHeaderID = @RMAHeaderID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAHeaderID", rmaID);

                return Connection.Query<ReturnNotePreviewDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}
