using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Stock;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;
using ShopperHolic.API.ShopperAPI.Models.Security;

namespace ShopperHolic.API.ShopperAPI.Controllers
{
    [Authorize(Policy = "IsAdminUser")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IUserService UserService, EncSettings encryptionSettings)
        {
            _userManager = new UserManager(UserService);
            _encSettings = encryptionSettings;
        }

        private UserManager _userManager;
        private EncSettings _encSettings;

        [HttpPost]
        public ActionResult<UserProfileDTO> Create([FromBody] UserCreateDTO userInput)
        {
            try { return _userManager.Create(userInput, _encSettings); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<UserProfileDTO> GetByID([FromQuery] int id)
        {
            try { return _userManager.GetyByID(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<UserPreviewDTO>> GetAll()
        {
            try { return _userManager.GetAllPreview(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpPut]
        public ActionResult<UserProfileDTO> Update([FromBody] UserProfileDTO newModel)
        {
            try { return _userManager.Update(newModel, _encSettings); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete]
        public ActionResult<bool> Delete([FromQuery] int id)
        {
            try { return _userManager.Delete(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<List<UserRoleTypeDTO>> GetAvailableRoles()
        {
            try { return _userManager.GetAvailableRoles(); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<UserDetailedDTO> GetDetailedUser([FromQuery] int id)
        {
            try { return _userManager.GetDetailedUser(id); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<bool> AddCustomerLogin([FromQuery] int userID, [FromQuery] int customerID)
        {
            try { return _userManager.AddCustomerLogin(userID, customerID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<bool> RemoveCustomerLogin([FromQuery] int userID, [FromQuery] int customerID)
        {
            try { return _userManager.RemoveCustomerLogin(userID, customerID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<bool> AddSupplierLogin([FromQuery] int userID, [FromQuery] int supplierID)
        {
            try { return _userManager.AddSupplierLogin(userID, supplierID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }

        [HttpGet]
        public ActionResult<bool> RemoveSupplierLogin([FromQuery] int userID, [FromQuery] int supplierID)
        {
            try { return _userManager.RemoveSupplierLogin(userID, supplierID); }
            catch (BaseCustomException ex) { return BadRequest(ex.Message); }
        }
    }
}