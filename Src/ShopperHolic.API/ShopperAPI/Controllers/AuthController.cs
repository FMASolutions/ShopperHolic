using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Security;
using System.Collections.Generic;
namespace ShopperHolic.API.ShopperAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {      
        public AuthController(JWTSettings settings)
        {
            _jwtSettings = settings;
        }
        
        private JWTSettings _jwtSettings = null; 

        [HttpPost]
        public ActionResult<AuthenticatedUserModel> AttemptAuthentication([FromBody] AttemptAuthModel inputModel)
        {
            SecurityManager secManager = new SecurityManager(_jwtSettings);
            var result = secManager.PerformAuthentication(inputModel.UsernameInput, inputModel.PasswordInput);
            if(result == null || result.IsAuthenticated == false)
            {
                this.Response.Headers.Add("AuthFailed","AuthFailedForUser" + inputModel.UsernameInput);
                return Unauthorized();
            }
            else
            {
                return result;
            }
        }
        
        
        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<UserClaim>> GetUserClaims([FromQuery] string username)
        {  
            if(!string.IsNullOrEmpty(username))
            {
                SecurityManager secManager = new SecurityManager(_jwtSettings);
                var result = secManager.GetUserClaims(username);
                if(result != null || result.Count > 0)
                    return result;
            }            
            return BadRequest();
        }
    } 
}