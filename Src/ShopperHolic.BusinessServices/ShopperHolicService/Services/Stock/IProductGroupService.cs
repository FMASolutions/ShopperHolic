using System;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.BusinessServices.ShopperHolicService.Services
{
    public interface IProductGroupService : IDisposable
    {
        ProductGroupDTO Create(ProductGroupCreateDTO modelToCreate);
        ProductGroupDTO GetByID(int id);
        IEnumerable<ProductGroupPreviewDTO> GetAllPreview();
        ProductGroupDTO Update(ProductGroupDTO newModel);
        bool Delete(int id);
    }
}