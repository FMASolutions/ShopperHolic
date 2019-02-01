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
    public class InvoiceController : ControllerBase
    {
        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceManager = new InvoiceManager(invoiceService);
        }

        private InvoiceManager _invoiceManager;

        [Authorize(Policy = "UserCanInvoiceOrder")]
        [HttpPut]
        public ActionResult<List<InvoiceDTO>> InvoiceOrder([FromQuery] int orderID)
        {
            try { return _invoiceManager.InvoiceOrder(orderID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<InvoiceDTO>> GetByID([FromQuery] int id)
        {
            try { return _invoiceManager.GetByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<InvoicePreviewDTO>> GetAll()
        {
            try { return _invoiceManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}