using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models.Security;
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
        [Route("~/api/Auth/AttemptAuthentication")]
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
    } 
}