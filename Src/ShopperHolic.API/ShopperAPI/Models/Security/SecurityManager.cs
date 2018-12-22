using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI.Models.Security
{
    public class SecurityManager : IDisposable
    {
        public SecurityManager(JWTSettings jwtSettings, ISecurityService securityService)
        {
            _jwtSettings = jwtSettings;
            _securityService = securityService;
        }

        public void Dispose()
        {
            _securityService.Dispose();
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
                        string userJWTToken = BuildUserJwtToken(username, claims);
                        if (!string.IsNullOrEmpty(userJWTToken))
                        {
                            returnUser = new AuthenticatedUserDTO();
                            returnUser.RefreshToken = BuildRefreshToken(username);
                            returnUser.BearerToken = userJWTToken;
                            returnUser.IsAuthenticated = true;
                            returnUser.Username = username;

                            foreach (var claim in claims) { returnUser.UserClaims.Add(claim); }
                        }
                    }
                }
            }
            return returnUser;
        }

        private string BuildUserJwtToken(string username, IEnumerable<UserClaimDTO> claims)
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

        public AuthenticatedUserDTO RefreshToken(AuthenticatedUserDTO currentUser)
        {
            AuthenticatedUserDTO returnUser = null;
            JwtSecurityToken currentRefreshToken = new JwtSecurityToken(currentUser.RefreshToken);
            var claims = _securityService.GetUserClaims(currentUser.Username);
            if (claims != null)
            {
                string newUserToken = BuildUserJwtToken(currentUser.Username, claims);
                returnUser = new AuthenticatedUserDTO();
                returnUser.BearerToken = newUserToken;
                returnUser.IsAuthenticated = true;
                returnUser.RefreshToken = currentUser.RefreshToken;
                returnUser.Username = currentUser.Username;

                foreach (var claim in claims) { returnUser.UserClaims.Add(claim); }
            }
            return returnUser;
        }

        private string BuildRefreshToken(string username)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_jwtSettings.Key));

            List<Claim> jwtClaims = new List<Claim>();
            jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Sub, username));
            jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: jwtClaims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }





    }
}