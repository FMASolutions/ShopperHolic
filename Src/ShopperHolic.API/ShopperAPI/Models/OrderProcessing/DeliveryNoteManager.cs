using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class DeliveryNoteManager : IDisposable
    {
        public DeliveryNoteManager(IDeliveryNoteService service)
        {
            _deliveryNoteService = service;
        }

        public void Dispose()
        {
            _deliveryNoteService.Dispose();
        }

        private IDeliveryNoteService _deliveryNoteService;

        public List<DeliveryNoteItemDTO> DeliverOrder(int orderID)
        {
            var result = _deliveryNoteService.DeliverOrder(orderID);
            var returnList = new List<DeliveryNoteItemDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<DeliveryNoteItemDTO> GetByID(int id)
        {
            var result = _deliveryNoteService.GetByID(id);
            var returnList = new List<DeliveryNoteItemDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public List<DeliveryNotePreviewDTO> GetAllPreview()
        {
            var result = _deliveryNoteService.GetAllPreview();
            var returnList = new List<DeliveryNotePreviewDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
    }
}