using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface IRMARepo
    {
        int Create(CreateRMADTO entityToCreate);
        RMADTO GetByID(int rmaID);
        IEnumerable<RMAPreviewDTO> GetAllPreview();
        bool Delete(int rmaID);
        RMAItemDTO GetRMAItemByID(int rmaItemID);
        IEnumerable<RMAItemDTO> GetItemsForRMA(int rmaID);
        int AddItemToRMA(CreateRMAItemDTO entityToCreate);
        RMAItemDTO UpdateRMAItem(UpdateRMAItemDTO updatedRecord);
        bool RemoveItemFromRMA(int rmaItemID);
    }
}
