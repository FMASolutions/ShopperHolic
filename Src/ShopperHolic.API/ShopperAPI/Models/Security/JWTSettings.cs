namespace ShopperHolic.API.ShopperAPI.Models.Security
{
    public class JWTSettings{
        public string Key {get;set;}
        public string Issuer {get;set;}
        public string Audience {get;set;}
        public int MinutesToExpiration {get;set;}
    }
}