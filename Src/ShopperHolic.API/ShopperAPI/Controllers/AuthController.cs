using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Security;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using Newtonsoft.Json;

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
            _securityManager = new SecurityManager(_jwtSettings, _securityService);
        }

        private JWTSettings _jwtSettings = null;
        private ISecurityService _securityService = null;
        private SecurityManager _securityManager = null;

        [HttpPost]
        public ActionResult<string> AttemptAuthentication([FromBody] AttemptLoginDTO inputModel)
        {
            var result = _securityManager.AuthUserAndGetExchangeKey(inputModel);
            if (string.IsNullOrEmpty(result)) { return BadRequest(); }
            else { return JsonConvert.SerializeObject(result); }
        }

        [HttpGet]
        public ActionResult<AuthenticatedUserDTO> TokenExchange([FromQuery]string exchangeKey,[FromQuery] string username)
        {
            var authenticatedUserDTO = _securityManager.ExchangeKeyForToken(exchangeKey, username);
            if(authenticatedUserDTO.IsAuthenticated & !string.IsNullOrEmpty(authenticatedUserDTO.BearerToken)) { return authenticatedUserDTO; }
            return BadRequest();
        }
    }
}