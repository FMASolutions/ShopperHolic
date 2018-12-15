using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Stock;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using Newtonsoft.Json;
using System;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.API.ShopperAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductGroupController : ControllerBase
    {
        public ProductGroupController(IStockService stockService)
        {
            _stockManager = new StockManager(stockService);
        }

        [HttpPost]
        public ActionResult<ProductGroupDTO> Create([FromBody] CreateProductGroupDTO userInput)
        {
            try
            {
            var result = _stockManager.CreateProductGroup(userInput);
            return result;
            }
            catch(KeyAlreadyExists ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private StockManager _stockManager;
    }
}