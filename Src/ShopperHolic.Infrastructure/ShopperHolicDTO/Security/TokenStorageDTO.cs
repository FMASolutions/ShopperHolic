using System;
namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    //TDO: CHANGE THIS TO A DTO STILL ENSURING THE MAPPING TO THE ANGULAR UI AuthenticatedUser REMAINS
    public class TokenStorageDTO
    {
       public int UserID {get;set;}
       public string Token {get;set;}
       public DateTime TokenIssueDate {get;set;}
       public DateTime TokenExpiryDate {get;set;}
    }
}