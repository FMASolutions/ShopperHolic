using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class SupplierManager : IDisposable
    {
        public SupplierManager(ISupplierService service)
        {
            _supplierService = service;
        }

        public void Dispose()
        {
            _supplierService.Dispose();
        }

        private ISupplierService _supplierService;

        public SupplierDTO Create(SupplierCreateDTO createModel)
        {
            return _supplierService.Create(createModel);
        }
        public SupplierDTO GetyByID(int id)
        {
            return _supplierService.GetByID(id);
        }

        public List<SupplierPreviewDTO> GetAllPreview()
        {
            var returnList = new List<SupplierPreviewDTO>();
            foreach(var current in _supplierService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public SupplierDTO Update(SupplierDTO newModel)
        {
            return _supplierService.Update(newModel);
        }

        public bool Delete(int id)
        {
            return _supplierService.Delete(id);
        }
    }
}