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
    public class AddressController : ControllerBase
    {
        public AddressController(IAddressService addressService)
        {
            _addressManager = new AddressManager(addressService);
        }

        private AddressManager _addressManager;

        [Authorize(Policy = "UserCanCreateAddress")]
        [HttpPost]
        public ActionResult<AddressDTO> Create([FromBody] AddressCreateDTO userInput)
        {
            try { return _addressManager.Create(userInput); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<AddressDTO> GetByID([FromQuery] int id)
        {
            try { return  _addressManager.GetyByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<AddressPreviewDTO>> GetAll()
        {
            try { return _addressManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanEditIAddress")]
        [HttpPut]
        public ActionResult<AddressDTO> Update([FromBody] AddressDTO newModel)
        {
            try { return _addressManager.Update(newModel); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteAddress")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try{return _addressManager.Delete(id);}
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        public ActionResult<AddressDetailedDTO> GetDetailedAddress(int addressID)
        {
            try { return  _addressManager.GetDetailedAddress(addressID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}