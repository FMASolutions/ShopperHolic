using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public class InvoiceService : BaseService, IInvoiceService
    {
        public InvoiceService(string connectionString) : base(connectionString) { }
        internal InvoiceService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public IEnumerable<InvoiceDTO> InvoiceOrder(int orderID)
        {
            try
            {
                int newInvID = UOW.InvoiceRepo.InvoiceOrder(orderID);
                UOW.SaveChanges();
                return UOW.InvoiceRepo.GetByID(newInvID);;
            }
            catch (Exception ex)
            {
                UOW.RollbackChanges();
                throw ex;
            }
        }
        public IEnumerable<InvoiceDTO> GetByID(int id)
        {
            return UOW.InvoiceRepo.GetByID(id);
        }
        public IEnumerable<InvoicePreviewDTO> GetAllPreview()
        {
            return UOW.InvoiceRepo.GetAllPreview();
        }
    }
}