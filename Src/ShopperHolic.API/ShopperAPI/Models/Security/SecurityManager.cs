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

        public string AuthUserAndGetExchangeKey(AttemptLoginDTO userInputDTO)
        {
            return _securityService.AttemptUserAuthenticationAndGetAccessKey(userInputDTO);
        }
        public AuthenticatedUserDTO ExchangeKeyForToken(string exchangeKey, string username)
        {
            AuthenticatedUserDTO returnUser = new AuthenticatedUserDTO();
            UserProfileDTO searchResult = _securityService.GetUserProfile(username);
            if (searchResult != null)
            {
                if (_securityService.VerifyAccessKey(exchangeKey))
                {
                    var claims = _securityService.GetUserClaims(username);
                    if (claims != null)
                    {
                        string JWToken = BuildJwtToken(username, claims);
                        if (!string.IsNullOrEmpty(JWToken))
                        {
                            returnUser = new AuthenticatedUserDTO();
                            returnUser.BearerToken = JWToken;
                            returnUser.IsAuthenticated = true;
                            returnUser.Username = username;
                            foreach (var claim in claims) { returnUser.UserClaims.Add(claim); }
                            _securityService.StoreToken(
                                new TokenStorageDTO
                                {
                                    UserID = searchResult.UserID,
                                    Token = JWToken,
                                    TokenIssueDate = DateTime.Now,
                                    TokenExpiryDate = DateTime.Now.AddMinutes(_jwtSettings.MinutesToExpiration)
                                }
                            );

                        }
                    }
                }
            }
            return returnUser;
        }

        protected string BuildJwtToken(string username, IEnumerable<UserClaimDTO> claims)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_jwtSettings.Key));

            List<Claim> jwtClaims = new List<Claim>();
            //Standard Claims
            jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Sub, username));
            jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            //Add Custom Claims from DB
            foreach (var userClaim in claims)
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