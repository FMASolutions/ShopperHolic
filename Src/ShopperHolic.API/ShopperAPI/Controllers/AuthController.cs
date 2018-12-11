using Microsoft.AspNetCore.Mvc;
using ShopperHolic.API.ShopperAPI.Models;
namespace ShopperHolic.API.ShopperAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {        
        [HttpPost]
        [Route("~/api/Auth/AttemptAuthentication")]
        public ActionResult<object> AttemptAuthentication([FromBody] AttemptAuthModel inputModel)
        {
            string result = inputModel.PerformAuthentication();
            if(string.IsNullOrEmpty(result))
            {
                this.Response.Headers.Add("AuthFailed","AuthFailedForUser" + inputModel.UsernameInput);
                return Unauthorized();
            }
            else
            {
                AccessToken accessToken = new AccessToken();
                accessToken.Token = result;
                accessToken.IssueDateTime = System.DateTime.Now;
                return accessToken;
            }
        }


    } 
}