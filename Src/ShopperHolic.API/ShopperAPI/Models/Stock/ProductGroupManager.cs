using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class ProductGroupManager : IDisposable
    {
        public ProductGroupManager(IProductGroupService prodGroupService)
        {
            _prodGroupService = prodGroupService;
        }

        public void Dispose()
        {
            _prodGroupService.Dispose();
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

        public List<ProductGroupPreviewDTO> GetAllPreview()
        {
            var returnList = new List<ProductGroupPreviewDTO>();
            foreach(var current in _prodGroupService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public ProductGroupDTO Update(ProductGroupDTO newModel)
        {
            return _prodGroupService.Update(newModel);
        }

        public bool Delete(int productGroupID)
        {
            return _prodGroupService.Delete(productGroupID);
        }
    }
}