using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class CreditNoteManager : IDisposable
    {
        public CreditNoteManager(ICreditNoteService service)
        {
            _creditNoteService = service;
        }

        public void Dispose()
        {
            _creditNoteService.Dispose();
        }

        private ICreditNoteService _creditNoteService;

        public List<CreditNoteItemDTO> CreditRMA(int rmaID)
        {
            var result = _creditNoteService.CreditRMA(rmaID);
            var returnList = new List<CreditNoteItemDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<CreditNoteItemDTO> GetByID(int creditNoteID)
        {
            var result = _creditNoteService.GetByID(creditNoteID);
            var returnList = new List<CreditNoteItemDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<CreditNotePreviewDTO> GetAllPreview()
        {
            var result = _creditNoteService.GetAllPreview();
            var returnList = new List<CreditNotePreviewDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<CreditNotePreviewDTO> GetCreditNotesForOrder(int orderID)
        {
            var result = _creditNoteService.GetCreditNotesForOrder(orderID);
            var returnList = new List<CreditNotePreviewDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<CreditNotePreviewDTO> GetCreditNotesForRMA(int rmaID)
        {
            var result = _creditNoteService.GetCreditNotesForRMA(rmaID);
            var returnList = new List<CreditNotePreviewDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
    }
}