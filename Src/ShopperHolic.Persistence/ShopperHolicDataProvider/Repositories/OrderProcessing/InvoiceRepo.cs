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
          throw new NotImplementedException();
        }
        
        public InvoiceDTO GetByID(int id)
        {
          throw new NotImplementedException();
        }
        
        public IEnumerable<InvoicePreviewDTO> GetAllPreview()
        {
          throw new NotImplementedException();
        }
        
        public bool Delete(int id)
        {
          throw new NotImplementedException();
        }
    }
}
