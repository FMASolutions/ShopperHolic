using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Stock;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;
using System;

namespace ShopperHolic.API.ShopperAPI.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    [ApiController]
    public class CreditNoteController : ControllerBase
    {
        public CreditNoteController(ICreditNoteService creditNoteService)
        {
            _creditNoteManager = new CreditNoteManager(creditNoteService);
        }

        private CreditNoteManager _creditNoteManager;

        [Authorize(Policy = "UserCanCreditOrder")]
        [HttpPut]
        public ActionResult<List<CreditNoteItemDTO>> CreditRMA([FromQuery] int rmaID)
        {
            try { return _creditNoteManager.CreditRMA(rmaID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<CreditNoteItemDTO>> GetByID([FromQuery] int creditNoteID)
        {
            try { return _creditNoteManager.GetByID(creditNoteID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<CreditNotePreviewDTO>> GetAll()
        {
            try { return _creditNoteManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<CreditNotePreviewDTO>> GetCreditNotesForOrder([FromQuery] int orderID)
        {
            try { return _creditNoteManager.GetCreditNotesForOrder(orderID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<CreditNotePreviewDTO>> GetCreditNotesForRMA([FromQuery] int rmaID)
        {
            try { return _creditNoteManager.GetCreditNotesForRMA(rmaID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}