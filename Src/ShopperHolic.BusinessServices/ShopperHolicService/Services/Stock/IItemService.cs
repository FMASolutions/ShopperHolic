using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IItemService : IDisposable
    {
        ItemDTO Create(ItemCreateDTO modelToCreate);
        ItemDTO GetByID(int id);
        IEnumerable<ItemPreviewDTO> GetAllPreview();
        ItemDTO Update(ItemDTO newModel);
        bool Delete(int id);

        bool UpdateImage(int id, string imageName);
    }
}