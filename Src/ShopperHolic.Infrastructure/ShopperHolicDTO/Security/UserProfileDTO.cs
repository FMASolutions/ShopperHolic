namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class UserProfileDTO
    {
        public int UserID {get;set;}
        public int UserRoleTypeID {get; set;}
        public string Username {get;set;}
        public string EmailAddress {get;set;}
        public string EncryptedPassword {get;set;}
        public string Password {get;set;} //Plain text password only to be used for when updating the users password.
        public string KnownAs {get;set;}
    }
}