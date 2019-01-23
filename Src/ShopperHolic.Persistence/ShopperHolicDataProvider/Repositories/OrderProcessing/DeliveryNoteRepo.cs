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
          throw new NotImplementedException();
        }
        
        public DeliveryNoteDTO GetByID(int id)
        {
          throw new NotImplementedException();
        }
        
        public IEnumerable<DeliveryNotePreviewDTO> GetAllPreview()
        {
          throw new NotImplementedException();
        }
        
        public bool Delete(int id)
        {
          throw new NotImplementedException();
        }
    }
}
