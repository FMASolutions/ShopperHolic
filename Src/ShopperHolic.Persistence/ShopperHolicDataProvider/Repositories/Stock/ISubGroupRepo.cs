using ShopperHolic.Infrastructure.ShopperHolicDTO;
using System.Collections.Generic;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public interface ISubGroupRepo
    {
        int Create(SubGroupCreateDTO entityToCreate);
        SubGroupDTO GetByID(int id);
        IEnumerable<SubGroupPreviewDTO> GetAllPreview();       
        SubGroupDTO Update(SubGroupDTO updatedRecord);
        bool Delete(int id);
    }
}