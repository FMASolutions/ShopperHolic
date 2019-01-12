using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Stock;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.API.ShopperAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        public CustomerController(ICustomerService CustomerService)
        {
            _customerManager = new CustomerManager(CustomerService);
        }

        private CustomerManager _customerManager;

        [Authorize(Policy = "UserCanCreateCustomer")]
        [HttpPost]
        public ActionResult<CustomerDTO> Create([FromBody] CustomerCreateDTO userInput)
        {
            try { return _customerManager.Create(userInput); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<CustomerDTO> GetByID([FromQuery] int id)
        {
            try { return  _customerManager.GetyByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<CustomerPreviewDTO>> GetAll()
        {
            try { return _customerManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanEditCustomer")]
        [HttpPut]
        public ActionResult<CustomerDTO> Update([FromBody] CustomerDTO newModel)
        {
            try { return _customerManager.Update(newModel); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteCustomer")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try{return _customerManager.Delete(id);}
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}