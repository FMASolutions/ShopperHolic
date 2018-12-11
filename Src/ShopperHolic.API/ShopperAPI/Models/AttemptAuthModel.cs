namespace ShopperHolic.API.ShopperAPI.Models{
    public class AttemptAuthModel{
        public string UsernameInput {get;set;}
        public string PasswordInput {get;set;}

        public string PerformAuthentication()
        {
            if(this.UsernameInput == "faisal" && this.PasswordInput == "password123")
                return "TokenWhichNeedsExchangingForAJWTUsingTheTokenEndPoint";
            else
                return null;
        }
    }
}