using System;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Stock
{
    public class CustomerManager : IDisposable
    {
        public CustomerManager(ICustomerService service)
        {
            _customerService = service;
        }

        public void Dispose()
        {
            _customerService.Dispose();
        }

        private ICustomerService _customerService;

        public CustomerDTO Create(CustomerCreateDTO createModel)
        {
            return _customerService.Create(createModel);
        }
        public CustomerDTO GetByID(int id)
        {
            return _customerService.GetByID(id);
        }

        public List<CustomerPreviewDTO> GetAllPreview()
        {
            var returnList = new List<CustomerPreviewDTO>();
            foreach(var current in _customerService.GetAllPreview())
                returnList.Add(current);
            return returnList;
        }

        public CustomerDTO Update(CustomerDTO newModel)
        {
            return _customerService.Update(newModel);
        }

        public bool Delete(int id)
        {
            return _customerService.Delete(id);
        }

        public List<CustomerTypeDTO> GetCustomerTypes()
        {
            var returnList = new List<CustomerTypeDTO>();
            foreach(var current in _customerService.GetCustomerTypes())
                returnList.Add(current);
            return returnList;
        }
    }
}