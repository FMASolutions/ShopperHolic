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
    public class CityController : ControllerBase
    {
        public CityController(ICityService cityService)
        {
            _cityManager = new CityManager(cityService);
        }

        private CityManager _cityManager;

        [Authorize(Policy = "UserCanCreateCity")]
        [HttpPost]
        public ActionResult<CityDTO> Create([FromBody] CityCreateDTO userInput)
        {
            try { return _cityManager.Create(userInput); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<CityDTO> GetByID([FromQuery] int id)
        {
            try { return  _cityManager.GetByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<CityPreviewDTO>> GetAll()
        {
            try { return _cityManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanEditCity")]
        [HttpPut]
        public ActionResult<CityDTO> Update([FromBody] CityDTO newModel)
        {
            try { return _cityManager.Update(newModel); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteCity")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try{return _cityManager.Delete(id);}
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}