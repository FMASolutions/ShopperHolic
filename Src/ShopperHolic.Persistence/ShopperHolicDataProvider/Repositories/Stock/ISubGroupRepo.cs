using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ISubGroupRepo
    {
        int CreateSubGroup(SubGroup entityToCreate);
        SubGroupDTO GetSubGroupByID(int subGroupID);
        IEnumerable<SubGroupPreviewDTO> GetAllPreview();       
        SubGroupDTO Update(SubGroupDTO updatedSub);
        bool Delete(int id);
    }
}