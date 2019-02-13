using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class RMAManager : IDisposable
    {
        public RMAManager(IRMAService service)
        {
            _rmaService = service;
        }

        public void Dispose()
        {
            _rmaService.Dispose();
        }

        private IRMAService _rmaService;

        public RMADetailedDTO Create(CreateRMADTO entityToCreate)
        {
            return _rmaService.Create(entityToCreate);
        }
        public RMADetailedDTO GetByID(int rmaID)
        {
            return _rmaService.GetByID(rmaID);
        }
        public List<RMAPreviewDTO> GetAllPreview()
        {
            var result = _rmaService.GetAllPreview();
            var returnList = new List<RMAPreviewDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public bool Delete(int rmaID)
        {
            return _rmaService.Delete(rmaID);
        }
        public RMAItemDTO GetRMAItemByID(int rmaItemID)
        {
            return _rmaService.GetRMAItemByID(rmaItemID);
        }
        public List<RMAItemDTO> GetItemsForRMA(int rmaID)
        {
            var result = _rmaService.GetItemsForRMA(rmaID);
            var returnList = new List<RMAItemDTO>();
            foreach (var item in result)
                returnList.Add(item);
            return returnList;
        }
        public RMAItemDTO AddItemToRMA(CreateRMAItemDTO entityToCreate)
        {
            return _rmaService.AddItemToRMA(entityToCreate);
        }
        public RMAItemDTO UpdateRMAItem(UpdateRMAItemDTO updatedRecord)
        {
            return _rmaService.UpdateRMAItem(updatedRecord);
        }
        public bool RemoveItemFromRMA(int rmaItemID)
        {
            return _rmaService.RemoveItemFromRMA(rmaItemID);
        }
    }
}