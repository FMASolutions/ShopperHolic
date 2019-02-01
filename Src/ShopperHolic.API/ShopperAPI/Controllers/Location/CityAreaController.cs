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
    [Route("[controller]/[action]")]
    [ApiController]
    public class CityAreaController : ControllerBase
    {
        public CityAreaController(ICityAreaService cityAreaService)
        {
            _cityAreaManager = new CityAreaManager(cityAreaService);
        }

        private CityAreaManager _cityAreaManager;

        [Authorize(Policy = "UserCanCreateCityArea")]
        [HttpPost]
        public ActionResult<CityAreaDTO> Create([FromBody] CityAreaCreateDTO userInput)
        {
            try { return _cityAreaManager.Create(userInput); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<CityAreaDTO> GetByID([FromQuery] int id)
        {
            try { return  _cityAreaManager.GetByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<CityAreaPreviewDTO>> GetAll()
        {
            try { return _cityAreaManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanEditCityArea")]
        [HttpPut]
        public ActionResult<CityAreaDTO> Update([FromBody] CityAreaDTO newModel)
        {
            try { return _cityAreaManager.Update(newModel); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteCityArea")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try{return _cityAreaManager.Delete(id);}
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}