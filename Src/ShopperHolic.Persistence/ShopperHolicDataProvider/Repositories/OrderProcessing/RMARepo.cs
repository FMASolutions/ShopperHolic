using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class RMARepo : BaseRepo, IRMARepo
    {
        public RMARepo(IDbTransaction transaction) : base(transaction) { }

        public int Create(CreateRMADTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO RMAHeaders (RMAStatusID, OrderHeaderID, CreatedDate, ReturnedDate)
                VALUES(1, @OrderHeaderID, GetDate(), NULL)
                
                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderHeaderID", entityToCreate.OrderHeaderID);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public RMADTO GetByID(int rmaID)
        {
            try
            {
                string query = @"
                SELECT rh.RMAHeaderID AS [RMAID],rh.OrderHeaderID AS [OrderID]
                    ,rh.CreatedDate,rh.ReturnedDate,c.CustomerName
                    ,rs.RMAStatusValue AS [RMAStatusText]
                FROM RMAHeaders rh 
                INNER JOIN OrderHeaders oh ON rh.OrderHeaderID = oh.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                INNER JOIN RMAStatus rs ON rs.RMAStatusID = rh.RMAStatusID
                WHERE rh.RMAHeaderID = @RMAID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAID", rmaID);

                return Connection.QueryFirst<RMADTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<RMAPreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT rh.RMAHeaderID AS [RMAID],rh.OrderHeaderID AS [OrderID]
                    ,rh.CreatedDate,c.CustomerName
                    ,rs.RMAStatusValue AS [RMAStatusText]
                FROM RMAHeaders rh 
                INNER JOIN OrderHeaders oh ON rh.OrderHeaderID = oh.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                INNER JOIN RMAStatus rs ON rs.RMAStatusID = rh.RMAStatusID";

                return Connection.Query<RMAPreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public bool Delete(int rmaID)
        {
            try
            {
                string query = @"
                DELETE FROM RMAItems
                WHERE RMAHeaderID = @RMAHeaderID
                
                DELETE FROM RMAHeaders
                WHERE RMAHeaderID = @RMAHeaderID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAHeaderID", rmaID);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public RMAItemDTO GetRMAItemByID(int rmaItemID)
        {
            try
            {
                string query = @"
                 WITH UnprocessedReturns AS(
                    SELECT OrderItemID,SUM(ReturnQty) AS ReturnQty
                    FROM RMAItems
                    WHERE RMAItemStatusID = 1
                    AND RMAItemID != @RMAItemID
                    GROUP BY OrderItemID
                )


                SELECT ri.RMAItemID,ri.OrderItemID,ri.ReturnQty,
                    oi.OrderItemDescription AS OrderItemDescription,
                    rs.RMAStatusValue AS [RMAItemStatus],
                    ri.ReturnToInventory,ri.ReturnReason,
                    oi.OrderItemQty - (oi.TotalReturnedQty + ISNULL(up.ReturnQty,0)) AS AllowedReturnQty
                FROM RMAItems ri
                INNER JOIN OrderItems oi ON oi.OrderItemID = ri.OrderItemID
                INNER JOIN RMAStatus rs ON ri.RMAItemStatusID = rs.RMAStatusID
                LEFT OUTER JOIN UnprocessedReturns up ON up.OrderItemID = oi.OrderItemID
                WHERE ri.RMAItemID = @RMAItemID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAItemID", rmaItemID);

                return Connection.QueryFirst<RMAItemDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<RMAItemDTO> GetItemsForRMA(int rmaID)
        {
            try
            {
                string query = @"
                 WITH UnprocessedReturns AS(
                    SELECT OrderItemID,SUM(ReturnQty) AS ReturnQty
                    FROM RMAItems
                    WHERE RMAItemStatusID = 1
                    GROUP BY OrderItemID
                )


                SELECT ri.RMAItemID,ri.OrderItemID,ri.ReturnQty,
                    oi.OrderItemDescription AS OrderItemDescription,
                    rs.RMAStatusValue AS [RMAItemStatus],
                    ri.ReturnToInventory,ri.ReturnReason,
                    oi.OrderItemQty - (oi.TotalReturnedQty + ISNULL(up.ReturnQty,0)) AS AllowedReturnQty
                FROM RMAItems ri
                INNER JOIN OrderItems oi ON oi.OrderItemID = ri.OrderItemID
                INNER JOIN RMAStatus rs ON ri.RMAItemStatusID = rs.RMAStatusID
                LEFT OUTER JOIN UnprocessedReturns up ON up.OrderItemID = oi.OrderItemID
                WHERE ri.RMAHeaderID = @RMAID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAID", rmaID);

                return Connection.Query<RMAItemDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public int AddItemToRMA(CreateRMAItemDTO entityToCreate)
        {
            try
            {
                string query = @"
                INSERT INTO RMAItems(RMAHeaderID, OrderItemID, RMAItemStatusID, ReturnQty, ReturnToInventory, ReturnReason)
                VALUES(@RMAHeaderID, @OrderItemID, 1, @ReturnQty, @ReturnToInventory, @ReturnReason)

                SELECT SCOPE_IDENTITY()";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAHeaderID", entityToCreate.RMAID);
                queryParameters.Add("@OrderItemID", entityToCreate.OrderItemID);
                queryParameters.Add("@ReturnQty", entityToCreate.ReturnQty);
                queryParameters.Add("@ReturnToInventory", entityToCreate.ReturnToInventory ? 1 : 0);
                queryParameters.Add("@ReturnReason", entityToCreate.ReturnReason);

                return Connection.QueryFirst<int>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public RMAItemDTO UpdateRMAItem(UpdateRMAItemDTO updatedRecord)
        {
            try
            {
                string query = @"
                UPDATE RMAItems
                SET ReturnQty = @ReturnQty,
                    ReturnReason = @ReturnReason,
                    ReturnToInventory = @ReturnToInventory
                WHERE RMAItemID = @RMAItemID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAItemID", updatedRecord.RMAItemID);
                queryParameters.Add("@ReturnQty", updatedRecord.ReturnQty);
                queryParameters.Add("@ReturnReason", updatedRecord.ReturnReason);
                queryParameters.Add("@ReturnToInventory", updatedRecord.ReturnToInventory ? 1 : 0);

                int rowsUpdated = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsUpdated > 0) ? GetRMAItemByID(updatedRecord.RMAItemID) : throw noRecordEX;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public bool RemoveItemFromRMA(int rmaItemID)
        {
            try
            {
                string query = @"
                DELETE FROM RMAItems
                WHERE RMAItemID = @RMAItemID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAItemID", rmaItemID);

                int rowsDeleted = Connection.Execute(query, queryParameters, CurrentTrans);
                return (rowsDeleted > 0) ? true : false;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<RMAPreviewDTO> GetRMASForOrder(int orderID)
        {
            try
            {
                string query = @"
                SELECT rh.RMAHeaderID AS [RMAID],rh.OrderHeaderID AS [OrderID]
                    ,rh.CreatedDate,c.CustomerName
                    ,rs.RMAStatusValue AS [RMAStatusText]
                FROM RMAHeaders rh 
                INNER JOIN OrderHeaders oh ON rh.OrderHeaderID = oh.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                INNER JOIN RMAStatus rs ON rs.RMAStatusID = rh.RMAStatusID
                WHERE oh.OrderHeaderID = @OrderID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderID", orderID);


                return Connection.Query<RMAPreviewDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}