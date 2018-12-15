using System;
namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Entities
{
    public class User
    {
        public User()
        {

        }
        public User(Int32 userID, string username, string encryptedPassword, string knownAs, string emailAddress)
        {
            UserID = userID;
            Username = username;
            EncryptedPassword = encryptedPassword;
            KnownAs = knownAs;
            EmailAddress = emailAddress;
        }
        
        public Int32 UserID {get; internal set;}
        public string Username {get;set;}
        public string EncryptedPassword {get;set;}
        public string KnownAs {get;set;}
        public string EmailAddress {get;set;}
    }
}