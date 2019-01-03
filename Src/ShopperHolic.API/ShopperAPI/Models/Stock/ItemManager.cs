using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class ItemManager : IDisposable
    {
        public ItemManager(IItemService service)
        {
            _itemService = service;
        }

        public void Dispose()
        {
            _itemService.Dispose();
        }

        private IItemService _itemService;

        public ItemDTO Create(ItemCreateDTO modelToCreate)
        {
            return _itemService.Create(modelToCreate);
        }
        public ItemDTO GetyByID(int id)
        {
            return _itemService.GetByID(id);
        }

        public List<ItemPreviewDTO> GetAllPreview()
        {
            var returnList = new List<ItemPreviewDTO>();
            foreach(var current in _itemService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public ItemDTO Update(ItemDTO newModel)
        {
            return _itemService.Update(newModel);
        }

        public bool Delete(int id)
        {
            return _itemService.Delete(id);
        }
    }
}