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
    public class SubGroupController : ControllerBase
    {
        public SubGroupController(ISubGroupService subGroupService)
        {
            _subGroupManager = new SubGroupManager(subGroupService);
        }

        private SubGroupManager _subGroupManager;

        [Authorize(Policy = "UserCanCreateSubGroup")]
        [HttpPost]
        public ActionResult<SubGroupDTO> Create([FromBody] SubGroupCreateDTO userInput)
        {
            try { return _subGroupManager.Create(userInput); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<SubGroupDTO> GetByID([FromQuery] int id)
        {
            try { return _subGroupManager.GetByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<SubGroupPreviewDTO>> GetAll()
        {
            try { return _subGroupManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanEditSubGroup")]
        [HttpPut]
        public ActionResult<SubGroupDTO> Update([FromBody] SubGroupDTO newModel)
        {
            try { return _subGroupManager.Update(newModel); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteSubGroup")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try { return _subGroupManager.Delete(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}