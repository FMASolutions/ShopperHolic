using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Security;
using System.Collections.Generic;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;

namespace ShopperHolic.API.ShopperAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthController(JWTSettings settings, ISecurityService securityService)
        {
            _jwtSettings = settings;
            _securityService = securityService;
        }

        private JWTSettings _jwtSettings = null;
        private ISecurityService _securityService = null;

        [HttpPost]
        public ActionResult<AuthenticatedUserModel> AttemptAuthentication([FromBody] AttemptAuthModel inputModel)
        {
            SecurityManager secManager = new SecurityManager(_jwtSettings, _securityService);
            var result = secManager.PerformAuthentication(inputModel.UsernameInput, inputModel.PasswordInput);
            if (result == null || result.IsAuthenticated == false) { return Unauthorized(); }
            else { return result; }
        }
    }
}