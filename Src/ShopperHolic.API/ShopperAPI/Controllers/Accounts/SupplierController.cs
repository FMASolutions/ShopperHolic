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
    public class SupplierController : ControllerBase
    {
        public SupplierController(ISupplierService SupplierService)
        {
            _supplierManager = new SupplierManager(SupplierService);
        }

        private SupplierManager _supplierManager;

        [Authorize(Policy = "UserCanCreateSupplier")]
        [HttpPost]
        public ActionResult<SupplierDTO> Create([FromBody] SupplierCreateDTO userInput)
        {
            try { return _supplierManager.Create(userInput); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<SupplierDTO> GetByID([FromQuery] int id)
        {
            try { return  _supplierManager.GetByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<SupplierPreviewDTO>> GetAll()
        {
            try { return _supplierManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanEditSupplier")]
        [HttpPut]
        public ActionResult<SupplierDTO> Update([FromBody] SupplierDTO newModel)
        {
            try { return _supplierManager.Update(newModel); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [Authorize(Policy = "UserCanDeleteSupplier")]
        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try{return _supplierManager.Delete(id);}
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}