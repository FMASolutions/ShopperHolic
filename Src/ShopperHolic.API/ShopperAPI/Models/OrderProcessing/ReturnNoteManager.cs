using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class ReturnNoteManager : IDisposable
    {
        public ReturnNoteManager(IReturnNoteService service)
        {
            _returnNoteService = service;
        }

        public void Dispose()
        {
            _returnNoteService.Dispose();
        }

        private IReturnNoteService _returnNoteService;

        public List<ReturnNoteItemDTO> ProcessReturn(int rmaID)
        {
            var result = _returnNoteService.ProcessReturn(rmaID);
            var returnList = new List<ReturnNoteItemDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<ReturnNoteItemDTO> GetByID(int returnNoteID)
        {
            var result = _returnNoteService.GetByID(returnNoteID);
            var returnList = new List<ReturnNoteItemDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<ReturnNotePreviewDTO> GetAllPreview()
        {
            var result = _returnNoteService.GetAllPreview();
            var returnList = new List<ReturnNotePreviewDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<ReturnNotePreviewDTO> GetReturnNotesForOrder(int orderID)
        {
            var result = _returnNoteService.GetReturnNotesForOrder(orderID);
            var returnList = new List<ReturnNotePreviewDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<ReturnNotePreviewDTO> GetReturnNotesForRMA(int rmaID)
        {
            var result = _returnNoteService.GetReturnNotesForRMA(rmaID);
            var returnList = new List<ReturnNotePreviewDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
    }
}