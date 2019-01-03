using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IItemRepo
    {
        int Create(Item entityToCreate);
        ItemDTO GetByID(int id);
        IEnumerable<ItemPreviewDTO> GetAllPreview();       
        ItemDTO Update(ItemDTO updatedRecord);
        bool Delete(int id);
    }
}