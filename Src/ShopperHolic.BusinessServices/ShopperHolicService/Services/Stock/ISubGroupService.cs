using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface ISubGroupService : IDisposable
    {
        SubGroupDTO Create(SubGroupCreateDTO modelToCreate);
        SubGroupDTO GetByID(int subGroupID);
        IEnumerable<SubGroupPreviewDTO> GetAllPreview();
        SubGroupDTO Update(SubGroupDTO newModel);
        bool Delete(int subGroupID);
    }
}