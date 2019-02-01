using System.Collections.Generic;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class UserDetailedDTO
    {
        public UserDetailedDTO()
        {
            SupplierLogins = new List<SupplierLoginDTO>();
            CustomerLogins = new List<CustomerLoginDTO>();
        }
        public int UserID { get; set; }
        public int UserRoleTypeID {get; set;}
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public string EncryptedPassword { get; set; }
        public string Password { get; set; } //Plain text password only to be used for when updating the users password.
        public string KnownAs { get; set; }
        public List<SupplierLoginDTO> SupplierLogins;
        public List<CustomerLoginDTO> CustomerLogins;
    }
}