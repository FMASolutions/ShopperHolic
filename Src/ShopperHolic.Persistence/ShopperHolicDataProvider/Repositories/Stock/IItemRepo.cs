using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IItemRepo
    {
        int Create(ItemCreateDTO entityToCreate);
        ItemDTO GetByID(int id);
        IEnumerable<ItemPreviewDTO> GetAllPreview();       
        ItemDTO Update(ItemDTO updatedRecord);
        bool Delete(int id);
        bool UpdateImageNane(int id, string image);
        IEnumerable<ItemDetailedDTO> GetItemsInSubGroup(int subGroupID);
        IEnumerable<ItemDetailedDTO> GetItemsInProductGroup(int productGroupID);
    }
}