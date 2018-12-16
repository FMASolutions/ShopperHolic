using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class ProductGroupManager
    {
        public ProductGroupManager(IProductGroupService prodGroupService)
        {
            _prodGroupService = prodGroupService;
        }

        private IProductGroupService _prodGroupService;

        public ProductGroupDTO Create(ProductGroupCreateDTO prodGroupToCreate)
        {
            return _prodGroupService.Create(prodGroupToCreate);
        }
        public ProductGroupDTO GetyByID(int id)
        {
            return _prodGroupService.GetByID(id);
        }

        public IEnumerable<ProductGroupPreviewDTO> GetAllPreview()
        {
            return _prodGroupService.GetAllPreview();
        }
    }
}