using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IRMAService : IDisposable
    {
        RMADetailedDTO Create(CreateRMADTO entityToCreate);
        RMADetailedDTO GetByID(int rmaID);
        IEnumerable<RMAPreviewDTO> GetAllPreview();
        bool Delete(int rmaID);
        RMAItemDTO GetRMAItemByID(int rmaItemID);
        IEnumerable<RMAItemDTO> GetItemsForRMA(int rmaID);
        RMAItemDTO AddItemToRMA(CreateRMAItemDTO entityToCreate);
        RMAItemDTO UpdateRMAItem(UpdateRMAItemDTO updatedRecord);
        bool RemoveItemFromRMA(int rmaItemID);
    }
}