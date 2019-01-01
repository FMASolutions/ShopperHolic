using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class SubGroupManager : IDisposable
    {
        public SubGroupManager(ISubGroupService subGroupService)
        {
            _subGroupService = subGroupService;
        }

        public void Dispose()
        {
            _subGroupService.Dispose();
        }

        private ISubGroupService _subGroupService;

        public SubGroupDTO Create(SubGroupCreateDTO subGroupToCreate)
        {
            return _subGroupService.Create(subGroupToCreate);
        }
        public SubGroupDTO GetyByID(int id)
        {
            return _subGroupService.GetByID(id);
        }

        public List<SubGroupPreviewDTO> GetAllPreview()
        {
            var returnList = new List<SubGroupPreviewDTO>();
            foreach(var current in _subGroupService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public SubGroupDTO Update(SubGroupDTO newModel)
        {
            return _subGroupService.Update(newModel);
        }

        public bool Delete(int subGroupID)
        {
            return _subGroupService.Delete(subGroupID);
        }
    }
}