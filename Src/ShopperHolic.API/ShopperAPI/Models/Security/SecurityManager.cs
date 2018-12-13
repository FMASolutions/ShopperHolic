using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
namespace ShopperHolic.API.ShopperAPI.Models.Security
{
    public class SecurityManager
    {
        public SecurityManager(JWTSettings jwtSettings, ISecurityService securityService)
        {
            _jwtSettings = jwtSettings;
            _securityService = securityService;
        }

        private JWTSettings _jwtSettings = null;
        private ISecurityService _securityService = null;

        public AuthenticatedUserModel PerformAuthentication(string username, string password)
        {
            AuthenticatedUserModel returnValue = null;
            AttemptLoginDTO mappedDTO = new AttemptLoginDTO();
            mappedDTO.Username = username;
            mappedDTO.UserInputPasswordPlainText = password;
            var userClaimDTO = _securityService.AttemptUserLogin(new AttemptLoginDTO { Username = username, UserInputPasswordPlainText = password } );
            if(userClaimDTO != null)
            {
                returnValue = new AuthenticatedUserModel();
                bool firstIteration = true;
                foreach(var claim in userClaimDTO)
                {
                    if(firstIteration)
                    {
                        returnValue.IsAuthenticated = true;
                        returnValue.Username = claim.Username;
                    }
                    returnValue.UserClaims.Add(new UserClaim{ ClaimType = claim.ClaimType, ClaimValue = claim.ClaimValue});
                }
                
                //Finally create the JWT based on the current claims.
                returnValue.BearerToken = BuildJwtToken(returnValue);
            }
            return returnValue;
        }

        protected string BuildJwtToken(AuthenticatedUserModel user)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_jwtSettings.Key));

            List<Claim> jwtClaims = new List<Claim>();
            //Standard Claims
            jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Username));
            jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            //Default IsAuthenticated 
            jwtClaims.Add(new Claim("IsAuthenticated", user.IsAuthenticated.ToString().ToLower()));

            //Add Custom Claims from DB
            foreach (var userClaim in user.UserClaims)
                jwtClaims.Add(new Claim(userClaim.ClaimType, userClaim.ClaimValue));

            //Build JWT Token
            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: jwtClaims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.MinutesToExpiration),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}