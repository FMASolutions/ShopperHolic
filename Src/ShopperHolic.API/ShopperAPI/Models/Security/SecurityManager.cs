using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace ShopperHolic.API.ShopperAPI.Models.Security
{
    public class SecurityManager
    {
        public SecurityManager(JWTSettings jwtSettings)
        {
            _jwtSettings = jwtSettings;
        }

        private JWTSettings _jwtSettings = null;

        public AuthenticatedUserModel PerformAuthentication(string username, string password)
        {
            if (username == "faisal" && password == "password123")
            {
                AuthenticatedUserModel authUser = new AuthenticatedUserModel();
                authUser.Username = username;
                authUser.IsAuthenticated = true;
                UserClaim testClaim = new UserClaim
                {
                    ClaimType = "TestClaimType",
                    ClaimValue = "true"
                };
                authUser.UserClaims.Add(testClaim);
                authUser.BearerToken = BuildJwtToken(authUser);

                return authUser;
            }
            else
                return null;
        }
        public List<UserClaim> GetUserClaims(string username)
        {
            List<UserClaim> claims = new List<UserClaim>();
            UserClaim testClaim = new UserClaim
            {
                ClaimType = "TestClaimType",
                ClaimValue = "true"
            };
            claims.Add(testClaim);
            return claims;
        }

        protected string BuildJwtToken(AuthenticatedUserModel user)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_jwtSettings.Key));

            List<Claim> jwtClaims = new List<Claim>();
            //Standard Claims
            jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Username));
            jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            //Add Custom Claims
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