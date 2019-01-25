using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class InvoiceManager : IDisposable
    {
        public InvoiceManager(IInvoiceService service)
        {
            _invoiceService = service;
        }

        public void Dispose()
        {
            _invoiceService.Dispose();
        }

        private IInvoiceService _invoiceService;

        public List<InvoiceDTO> InvoiceOrder(int orderID)
        {
            var result = _invoiceService.InvoiceOrder(orderID);
            var returnList = new List<InvoiceDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<InvoiceDTO> GetByID(int id)
        {
            var result = _invoiceService.GetByID(id);
            var returnList = new List<InvoiceDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<InvoicePreviewDTO> GetAllPreview()
        {
            var result = _invoiceService.GetAllPreview();
            var returnList = new List<InvoicePreviewDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
    }
}