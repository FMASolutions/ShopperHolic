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

        public IEnumerable<InvoiceDTO> GetByID(int id)
        {
            try
            {
                string query = @"
                SELECT ih.InvoiceHeaderID AS [InvoiceID], ii.InvoiceItemID, ih.OrderHeaderID AS [OrderID],
                  ih.InvoiceDate, oi.OrderItemDescription AS [ItemDescription],
                  oi.OrderItemQty AS [ItemQty], oi.OrderItemUnitPrice AS [ItemPrice],
                  oi.OrderItemUnitPriceAfterDiscount * ii.InvoiceItemQty AS [ItemTotal],
                  ins.InvoiceStatusValue AS [InvoiceItemStatus]
                FROM InvoiceHeaders ih
                INNER JOIN InvoiceItems ii ON ih.InvoiceHeaderID = ii.InvoiceHeaderID
                INNER JOIN OrderItems oi ON oi.OrderItemID = ii.OrderItemID
                INNER JOIN InvoiceStatus ins ON ins.InvoiceStatusID = ii.InvoiceItemStatusID
                WHERE ih.InvoiceHeaderID = @InvoiceID";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@InvoiceID", id);

                return Connection.Query<InvoiceDTO>(query, queryParameters, CurrentTrans);
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
                  CAST(ROUND(SUM(oi.OrderItemUnitPriceAfterDiscount * ii.InvoiceItemQty),2) AS NUMERIC(36,2)) AS [InvoiceTotal]
                FROM InvoiceHeaders ih
                INNER JOIN InvoiceItems ii ON ih.InvoiceHeaderID = ii.InvoiceHeaderID
                INNER JOIN OrderItems oi ON oi.OrderItemID = ii.OrderItemID
                INNER JOIN InvoiceStatus ins ON ins.InvoiceStatusID = ih.InvoiceStatusID
                GROUP BY ih.InvoiceHeaderID,ih.OrderHeaderID, ins.InvoiceStatusValue, ih.InvoiceDate";

                return Connection.Query<InvoicePreviewDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}
