using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;

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
        public ItemDTO GetByID(int id)
        {
            return _itemService.GetByID(id);
        }

        public List<ItemPreviewDTO> GetAllPreview()
        {
            var returnList = new List<ItemPreviewDTO>();
            foreach (var current in _itemService.GetAllPreview())
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

        public bool UploadFileAndItem(IFormFile file, int id, IHostingEnvironment env)
        {
            var upload = Path.Combine(env.ContentRootPath + "\\wwwroot\\", "uploads");
            if (file.Length > 0)
            {
                if (!Directory.Exists(upload))
                {
                    Directory.CreateDirectory(upload);
                }
                var extension = Path.GetExtension(file.FileName);
                var currentPath = Path.Combine(upload, id + extension);
                using (var filestream = new FileStream(currentPath, FileMode.OpenOrCreate))
                {
                    file.CopyTo(filestream);
                    _itemService.UpdateImage(id,Path.GetFileName(currentPath));
                }
            }
            return true;
        }
    }
}