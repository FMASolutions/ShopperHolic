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
    public class CountryController : ControllerBase
    {
        public CountryController(ICountryService countryService)
        {
            _countryManager = new CountryManager(countryService);
        }

        [Authorize(Policy = "UserCanCreateCountry")]
        [HttpPost]
        public ActionResult<CountryDTO> Create([FromBody] CountryCreateDTO userInput)
        {
            try { return _countryManager.Create(userInput); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<CountryDTO> GetByID([FromQuery] int id)
        {
            try { return  _countryManager.GetByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<CountryDTO>> GetAll()
        {
            try { return _countryManager.GetAll(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanEditCountry")]
        [HttpPut]
        public ActionResult<CountryDTO> Update([FromBody] CountryDTO newModel)
        {
            try { return _countryManager.Update(newModel); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteCountry")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try{return _countryManager.Delete(id);}
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        private CountryManager _countryManager;
    }
}