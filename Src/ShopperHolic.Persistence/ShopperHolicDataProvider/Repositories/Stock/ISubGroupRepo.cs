using ShopperHolic.Persistence.ShopperHolicDataProvider.Entities;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ISubGroupRepo
    {
        int Create(SubGroup entityToCreate);
        SubGroupDTO GetByID(int id);
        IEnumerable<SubGroupPreviewDTO> GetAllPreview();       
        SubGroupDTO Update(SubGroupDTO updatedRecord);
        bool Delete(int id);
    }
}