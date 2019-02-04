using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class InvoiceRepo : BaseRepo, IInvoiceRepo
    {
        public InvoiceRepo(IDbTransaction transaction) : base(transaction) { }

        public int InvoiceOrder(int orderID)
        {
            try
            {
                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderHeaderID", orderID);
                int invoiceID = Connection.QueryFirst<int>("GenerateInvoiceForOrder", queryParameters, CurrentTrans, commandType: CommandType.StoredProcedure);
                return invoiceID;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<InvoiceItemDTO> GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT ih.InvoiceHeaderID AS [InvoiceID], ii.InvoiceItemID, ih.OrderHeaderID AS [OrderID],
                  ih.InvoiceDate, oi.OrderItemDescription AS [ItemDescription],
                  oi.OrderItemQty AS [ItemQty], oi.OrderItemUnitPriceAfterDiscount AS [ItemPrice],
                  oi.OrderItemUnitPriceAfterDiscount * ii.InvoiceItemQty AS [ItemTotal],
                  ins.InvoiceStatusValue AS [InvoiceItemStatus], c.CustomerName, i.itemCode
                FROM InvoiceHeaders ih
                INNER JOIN InvoiceItems ii ON ih.InvoiceHeaderID = ii.InvoiceHeaderID
                INNER JOIN OrderItems oi ON oi.OrderItemID = ii.OrderItemID
                INNER JOIN InvoiceStatus ins ON ins.InvoiceStatusID = ii.InvoiceItemStatusID
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = oi.OrderHeaderID
				INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                INNER JOIN Items i ON i.ItemID = oi.ItemID
                WHERE ih.InvoiceHeaderID = @InvoiceID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@InvoiceID", id);

                return Connection.Query<InvoiceItemDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<InvoicePreviewDTO> GetAllPreview()
        {
            try
            {
                string query = @"
                SELECT ih.InvoiceHeaderID AS [InvoiceID], ih.OrderHeaderID AS [OrderID], ins.InvoiceStatusValue AS [InvoiceStatus],ih.InvoiceDate, 
                  CAST(ROUND(SUM(oi.OrderItemUnitPriceAfterDiscount * ii.InvoiceItemQty),2) AS NUMERIC(36,2)) AS [InvoiceTotal], c.CustomerName
                FROM InvoiceHeaders ih
                INNER JOIN InvoiceItems ii ON ih.InvoiceHeaderID = ii.InvoiceHeaderID
                INNER JOIN OrderItems oi ON oi.OrderItemID = ii.OrderItemID
                INNER JOIN InvoiceStatus ins ON ins.InvoiceStatusID = ih.InvoiceStatusID
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = oi.OrderHeaderID
				INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                GROUP BY ih.InvoiceHeaderID,ih.OrderHeaderID, ins.InvoiceStatusValue, ih.InvoiceDate, c.CustomerName";

                return Connection.Query<InvoicePreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }

        public IEnumerable<InvoicePreviewDTO> GetInvoicesForOrder(int orderID)
        {
            try
            {
                string query = @"
                SELECT ih.InvoiceHeaderID AS [InvoiceID], ih.OrderHeaderID AS [OrderID], ins.InvoiceStatusValue AS [InvoiceStatus],ih.InvoiceDate, 
                  CAST(ROUND(SUM(oi.OrderItemUnitPriceAfterDiscount * ii.InvoiceItemQty),2) AS NUMERIC(36,2)) AS [InvoiceTotal], c.CustomerName
                FROM InvoiceHeaders ih
                INNER JOIN InvoiceItems ii ON ih.InvoiceHeaderID = ii.InvoiceHeaderID
                INNER JOIN OrderItems oi ON oi.OrderItemID = ii.OrderItemID
                INNER JOIN InvoiceStatus ins ON ins.InvoiceStatusID = ih.InvoiceStatusID
                INNER JOIN OrderHeaders oh ON oh.OrderHeaderID = oi.OrderHeaderID
				INNER JOIN Customers c ON c.CustomerID = oh.CustomerID
                WHERE ih.OrderHeaderID = @OrderID
                GROUP BY ih.InvoiceHeaderID,ih.OrderHeaderID, ins.InvoiceStatusValue, ih.InvoiceDate, c.CustomerName
                ";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@OrderID", orderID);

                return Connection.Query<InvoicePreviewDTO>(query, queryParameters, CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}
