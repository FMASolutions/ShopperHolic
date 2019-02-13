using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class CreditNoteRepo : BaseRepo, ICreditNoteRepo
    {
        public CreditNoteRepo(IDbTransaction transaction) : base(transaction) { }

        public int CreditRMA(int rmaID)
        {
            try
            {
                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAHeaderID", rmaID);
                int creditNoteID = Connection.QueryFirst<int>("CreditRMA", queryParameters, CurrentTrans, commandType: CommandType.StoredProcedure);
                return creditNoteID;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<CreditNoteItemDTO> GetByID(int creditNoteID)
        {
            try
            {
                string query = @"
                SELECT cn.CreditNoteID,cni.CreditNoteItemID,oh.OrderHeaderID AS [OrderID], rh.RMAHeaderID AS [RMAID],
                    cn.CreditDate, oi.OrderItemDescription AS [ItemDescription], ri.ReturnQty AS [CreditQty],oi.OrderItemUnitPriceAfterDiscount AS [ItemPrice],
                    ri.ReturnQty * oi.OrderItemUnitPriceAfterDiscount AS [CreditItemTotal],cnis.CreditNoteStatusValue AS [CreditNoteItemStatus],
                    cnhs.CreditNoteStatusValue AS [CreditNoteStatus], c.CustomerName,i.ItemCode
                FROM CreditNotes cn
                INNER JOIN CreditNoteItems cni ON cn.CreditNoteID = cni.CreditNoteID
                INNER JOIN RMAHeaders rh ON rh.RMAHeaderID = cn.RMAHeaderID
                INNER JOIN RMAItems ri ON ri.RMAHeaderID = rh.RMAHeaderID
                INNER JOIN OrderItems oi ON oi.OrderItemID = ri.OrderItemID
                INNER JOIN CreditNoteStatus cnis ON cnis.CreditNoteStatusID = cni.CreditNoteItemStatusID
                INNER JOIN CreditNoteStatus cnhs ON cnhs.CreditNoteStatusID = cn.CreditNoteStatusID
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = rh.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                INNER JOIN Items i ON i.ItemID= oi.ItemID
                WHERE cn.CreditNoteID = @CreditNoteID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@CreditNoteID", creditNoteID);

                return Connection.Query<CreditNoteItemDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<CreditNotePreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT cn.CreditNoteID,rh.RMAHeaderID AS [RMAID],rh.OrderHeaderID AS [OrderID],cns.CreditNoteStatusValue AS [CreditNoteStatus],
                    cn.CreditDate AS [CreditNoteDate],SUM(oi.OrderItemUnitPriceAfterDiscount * ri.ReturnQty) AS [CreditTotal],c.CustomerName
                FROM CreditNotes cn
                INNER JOIN CreditNoteItems cni ON cn.CreditNoteID = cni.CreditNoteID
                INNER JOIN RMAHeaders rh ON rh.RMAHeaderID = cn.RMAHeaderID
                INNER JOIN CreditNoteStatus cns ON cns.CreditNoteStatusID = cn.CreditNoteStatusID
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = rh.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                INNER JOIN RMAItems ri ON ri.RMAHeaderID = rh.RMAHeaderID
                INNER JOIN OrderItems oi ON ri.OrderItemID = oi.OrderItemID
                GROUP BY cn.CreditNoteID, rh.RMAHeaderID, rh.OrderHeaderID, cns.CreditNoteStatusValue, cn.CreditDate, c.CustomerName";

                return Connection.Query<CreditNotePreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<CreditNotePreviewDTO> GetCreditNotesForOrder(int orderID)
        {
            try
            {
                string query = @"
                SELECT cn.CreditNoteID,rh.RMAHeaderID AS [RMAID],rh.OrderHeaderID AS [OrderID],cns.CreditNoteStatusValue AS [CreditNoteStatus],
                    cn.CreditDate AS [CreditNoteDate],SUM(oi.OrderItemUnitPriceAfterDiscount * ri.ReturnQty) AS [CreditTotal],c.CustomerName
                FROM CreditNotes cn
                INNER JOIN CreditNoteItems cni ON cn.CreditNoteID = cni.CreditNoteID
                INNER JOIN RMAHeaders rh ON rh.RMAHeaderID = cn.RMAHeaderID
                INNER JOIN CreditNoteStatus cns ON cns.CreditNoteStatusID = cn.CreditNoteStatusID
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = rh.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                INNER JOIN RMAItems ri ON ri.RMAHeaderID = rh.RMAHeaderID
                INNER JOIN OrderItems oi ON ri.OrderItemID = oi.OrderItemID
                WHERE rh.OrderHeaderID = @OrderHeaderID
                GROUP BY cn.CreditNoteID, rh.RMAHeaderID, rh.OrderHeaderID, cns.CreditNoteStatusValue, cn.CreditDate, c.CustomerName";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderHeaderID", orderID);

                return Connection.Query<CreditNotePreviewDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<CreditNotePreviewDTO> GetCreditNotesForRMA(int rmaID)
        {
            try
            {
                string query = @"
                SELECT cn.CreditNoteID,rh.RMAHeaderID AS [RMAID],rh.OrderHeaderID AS [OrderID],cns.CreditNoteStatusValue AS [CreditNoteStatus],
                    cn.CreditDate AS [CreditNoteDate],SUM(oi.OrderItemUnitPriceAfterDiscount * ri.ReturnQty) AS [CreditTotal],c.CustomerName
                FROM CreditNotes cn
                INNER JOIN CreditNoteItems cni ON cn.CreditNoteID = cni.CreditNoteID
                INNER JOIN RMAHeaders rh ON rh.RMAHeaderID = cn.RMAHeaderID
                INNER JOIN CreditNoteStatus cns ON cns.CreditNoteStatusID = cn.CreditNoteStatusID
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = rh.OrderHeaderID
                INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                INNER JOIN RMAItems ri ON ri.RMAHeaderID = rh.RMAHeaderID
                INNER JOIN OrderItems oi ON ri.OrderItemID = oi.OrderItemID
                WHERE rh.RMAHeaderID = @RMAHeaderID
                GROUP BY cn.CreditNoteID, rh.RMAHeaderID, rh.OrderHeaderID, cns.CreditNoteStatusValue, cn.CreditDate, c.CustomerName";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@RMAHeaderID", rmaID);

                return Connection.Query<CreditNotePreviewDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}
